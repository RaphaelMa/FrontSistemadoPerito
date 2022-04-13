import React, { useState, memo, useMemo, useCallback, useEffect, useRef } from 'react'
import { uniqBy } from 'lodash'
import { ChangedFiltersType } from './types'
import ContainerList from 'Components/MainList/ContainerList'
import HistoryTable from './HistoryTable'
import useGetHistories from './useGetHistories'
import Header from './Header'
import TableContainer from '../../Components/MainList/TableContainer'

type FiltersType = {
  dates: string[],
  user_id: string | null,
  action_id: string | null,
  module_id: string | null,
}

const History: React.FC = () => {
  const [filters, setFilters] = useState<FiltersType>({ dates: [], user_id: null, action_id: null, module_id: null })
  const [{ loading, data }, fetchHistories] = useGetHistories()

  useEffect(() => {
    fetchHistories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeFilters = useCallback((type: ChangedFiltersType, value: string | (string | undefined)[]) => {
    const new_filters = { ...filters, [type]: value }

    setFilters(new_filters)
  }, [filters])

  const histories = data || []

  const filteredHistories = useCallback(() => {
    return histories.filter(history => {
      if (filters.dates[0] && (!history.createAt || history.createAt < filters.dates[0])) return false
      if (filters.dates[1] && (!history.createAt || history.createAt > filters.dates[1])) return false
      if (filters.user_id && history.user.user_id !== filters.user_id) return false
      if (filters.action_id && history.action.action_id !== filters.action_id) return false
      if (filters.module_id && history.module.module_id !== filters.module_id) return false

      return true
    })
  }, [filters.action_id, filters.dates, filters.module_id, filters.user_id, histories])

  const modules = useMemo(() => histories.map(history => history.module), [histories])
  const non_duplicated_modules = useMemo(() => uniqBy(modules, 'module_id').filter(module => module.module_id), [modules])

  const actions = histories.map(history => history.action)
  const non_duplicated_actions = useMemo(() => uniqBy(actions, 'action_id').filter(action => action.action_id), [actions])

  const divRef = useRef<HTMLDivElement>(null)

  return (
    <ContainerList>
      <Header
        handleChangeFilters={handleChangeFilters}
        modules={non_duplicated_modules}
        actions={non_duplicated_actions}
      />

      <TableContainer divRef={divRef}>
        <HistoryTable
          data={filteredHistories()}
          loading={loading}
          divRef={divRef}
        />
      </TableContainer>
    </ContainerList>
  )
}

export default memo(History)
