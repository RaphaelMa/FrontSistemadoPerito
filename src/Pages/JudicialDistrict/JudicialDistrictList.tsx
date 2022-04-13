import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import ContainerList from 'Components/MainList/ContainerList'
import HeaderActions from 'Components/MainList/HeaderActions'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import { JudicialDistrictType } from './types'
import JudicialDistrictTable from './JudicialDistrictTable'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import useColumns from './useColumns'
import { Key } from 'antd/lib/table/interface'
import useGetJudicialDistrict from './useGetJudicialDistrict'
import messageError from 'Utils/messageError'
import JudicialDistrictDrawer, { JudicialDistrictDrawerType } from 'Components/Drawers/JudicialDistrict/JudicialDistrict'
import useDestroyJudicialDistrict from './useDestroyJudicialDistrict'
import { message } from 'antd'
import { useUserSelector } from 'Redux/UserReducer'
import useExportData from './useExportData'

const initial_filters: FiltersType = {
  search: '',
  pagination: {
    current_page: 1,
    page_size: 10,
  },
  sort: {
    field: 'description',
    order: 'ascend',
  },
}

const columns_keys = ['description']

type KindPersonListProps = {}

const JudicialDistrictList: React.FC<KindPersonListProps> = () => {
  const permissions = useUserSelector(state => state.permissions)

  const JudicialDistrictRef = useRef<JudicialDistrictDrawerType>(null)
  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<JudicialDistrictType[]>([])
  const [destroy, destroying] = useDestroyJudicialDistrict()
  const [{ loading }, getJudicialDistrict] = useGetJudicialDistrict()

  const fetchJudicialDistrict = async () => {
    try {
      const { data } = await getJudicialDistrict()
      setData(data)
    } catch (error) {
      messageError('2908201657')
    }
  }

  useEffect(() => {
    fetchJudicialDistrict()
    // eslint-disable-next-line
  }, [])

  const filtered_data = useMemo(() => filterData({ data: data, filters, columns_keys }), [filters, data])

  const onPressEnter = useCallback((value: string) => {
    setFilters((old_filters) => ({ ...old_filters, search: scapeRegex(value) }))
  }, [])

  const handleOpenDrawer = (id: string = '') => {
    JudicialDistrictRef.current?.open(id)
  }

  const handleDelete = async (id: string) => {
    try {
      const { data } = await destroy(id)

      if (!data?.success) {
        message.error(data.message)
        return
      }

      message.success('Comarca excluída com sucesso')
      fetchJudicialDistrict()
    } catch (e) {
      messageError('2908201644')
    }
  }

  const handleTableChange = useCallback((
    pagination: TablePaginationConfig,
    _filter: Record<string, Key[] | null>,
    sorter: any,
  ): void => {
    let internal_filters: FiltersType = filters

    if (sorter?.column?.sorter) {
      internal_filters = { ...internal_filters, sort: { order: sorter.order, field: sorter.field } }
    }

    internal_filters = {
      ...internal_filters,
      pagination: {
        current_page: pagination.current || internal_filters!.pagination!.current_page,
        page_size: pagination.pageSize || internal_filters!.pagination!.page_size,
      },
    }

    setFilters(internal_filters)
  }, [filters])

  const locale = useMemo(() => ({
    emptyText: (
      permissions?.judicialdistrict.create && (
        <EmptyComponent
          onClick={() => handleOpenDrawer()}
          action_text="Comarca"
        />
      )
    ),
  }), [permissions])

  const columns: ColumnsType<JudicialDistrictType> = useColumns({
    handleDelete,
    handleEdit: handleOpenDrawer,
  })

  const afterSave = () => {
    fetchJudicialDistrict()
  }

  const exportToXLS = useExportData(filtered_data)

  return (
    <ContainerList>
      <HeaderActions
        onPressEnter={onPressEnter}
        setFilters={setFilters}
        placeholder="Informe a comarca"
        button_text="Nova Comarca"
        handleNew={handleOpenDrawer}
        has_create_permission={permissions?.judicialdistrict.create}
        exportToXLS={exportToXLS}
      />

      <JudicialDistrictTable
        columns={columns}
        filtered_data={filtered_data}
        filters={filters}
        handleTableChange={handleTableChange}
        loading={loading || destroying}
        locale={locale}
      />

      <JudicialDistrictDrawer afterSave={afterSave} ref={JudicialDistrictRef}/>
    </ContainerList>
  )
}

export default JudicialDistrictList
