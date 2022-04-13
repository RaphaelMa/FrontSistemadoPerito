import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import HeaderActions from './HeaderActions'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import { JudicialDistrictLevelType } from './types'
import TableComponent from 'Pages/JudicialDistrictLevel/TableComponent'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import useColumns from 'Pages/JudicialDistrictLevel/useColumns'
import { Key } from 'antd/lib/table/interface'
import useGetJudicialDistrictLevel from './useGetJudicialDistrictLevel'
import messageError from 'Utils/messageError'
import JudicialDistrictLevelDrawer, { JudicialDistrictDrawerType } from 'Components/Drawers/JudicialDistrictLevel/JudicialDistrictLevel'
import useDestroy from './useDestroy'
import { message } from 'antd'
import styled from 'styled-components'
import { useUserSelector } from 'Redux/UserReducer'
import PermissionsContainer from 'Components/Permissions/Container'
import useExportData from './useExportData'

type InternalFiltersType = Omit<FiltersType, 'pagination'>

const initial_filters: InternalFiltersType = {
  search: '',
  sort: {
    field: 'description',
    order: 'ascend',
  },
}

const columns_keys = ['description']

type KindPersonListProps = {
  judicialDistrictId: string
}

const JudicialDistrictLevelList: React.FC<KindPersonListProps> = ({ judicialDistrictId }) => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)

  const DrawerRef = useRef<JudicialDistrictDrawerType>(null)
  const [filters, setFilters] = useState<InternalFiltersType>(initial_filters)
  const [data, setData] = useState<JudicialDistrictLevelType[]>([])
  const [destroy, destroying] = useDestroy()
  const [{ loading }, getJudicialDistrictLevel] = useGetJudicialDistrictLevel(judicialDistrictId)

  const fetchJudicialDistrictLevel = async () => {
    try {
      const { data = [] } = await getJudicialDistrictLevel()
      setData(data)
    } catch (error) {
      messageError('2908202049')
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchJudicialDistrictLevel()
    }, 500)
    // eslint-disable-next-line
  }, [])

  const filtered_data = useMemo(() => filterData({ data, filters: (filters as any), columns_keys }), [filters, data])

  const onPressEnter = useCallback((value: string) => {
    setFilters((old_filters) => ({ ...old_filters, search: scapeRegex(value) }))
  }, [])

  const handleOpenDrawer = (id?: string) => {
    DrawerRef.current?.open(id)
  }

  const handleDelete = async (id: string) => {
    try {
      const { data } = await destroy(id)

      if (!data?.success) {
        message.error(data.message)
        return
      }

      message.success('Vara excluída com sucesso')
      fetchJudicialDistrictLevel()
    } catch (e) {
      messageError('2908201934')
    }
  }

  const handleTableChange = useCallback((
    _pagination: TablePaginationConfig,
    _filter: Record<string, Key[] | null>,
    sorter: any,
  ): void => {
    let internal_filters: InternalFiltersType = filters

    if (sorter?.column?.sorter) {
      internal_filters = { ...internal_filters, sort: { order: sorter.order, field: sorter.field } }
    }

    setFilters(internal_filters)
  }, [filters])

  const locale = useMemo(() => ({
    emptyText: (
      <EmptyComponent
        onClick={() => handleOpenDrawer()}
        action_text="Vara"
      />
    ),
  }), [])

  const columns: ColumnsType<JudicialDistrictLevelType> = useColumns({
    handleDelete,
    handleEdit: handleOpenDrawer,
  })

  const afterSave = () => {
    fetchJudicialDistrictLevel()
  }

  const exportToXLS = useExportData(filtered_data)

  return (
    <PermissionsContainer has_module={plan_modules?.Register}>
      <Container>
        <HeaderActions
          onPressEnter={onPressEnter}
          setFilters={setFilters}
          placeholder="Informe a vara"
          button_text="Nova Vara"
          handleNew={handleOpenDrawer}
          exportToXLS={exportToXLS}
        />

        <TableComponent
          columns={columns}
          filtered_data={filtered_data}
          handleTableChange={handleTableChange}
          loading={loading || destroying}
          locale={locale}
        />

        <JudicialDistrictLevelDrawer
          judicialDistrictId={judicialDistrictId}
          afterSave={afterSave}
          ref={DrawerRef}
        />
      </Container>
    </PermissionsContainer>
  )
}

export default JudicialDistrictLevelList

const Container = styled.div`
  height: 100%;
  width: 100%;
`
