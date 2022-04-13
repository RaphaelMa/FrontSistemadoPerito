import React from 'react'
import { Button, Form, Switch, Input } from 'antd'
import { ProcessType } from './useGetProcess'

type Props = {
  loading: boolean,
  disabled: boolean,
  import_key?: ProcessType['statusImport_key'],
  description?: string,
  importProcess: () => void,
}

const ImportButton: React.FC<Props> = ({ import_key, loading, disabled, description, importProcess }) => {
  const show_import_button = import_key === undefined || import_key === 'not_imported'
  const disabled_switch = disabled || import_key === 'importing' || import_key === 'error_importing'

  if (show_import_button) {
    return (
      <>
        <Form.Item name="statusProcessMonitoring" noStyle>
          <Input type="hidden"/>
        </Form.Item>

        <Button
          disabled={disabled}
          loading={loading}
          type="primary"
          onClick={importProcess}
        >
          Importar
        </Button>
      </>
    )
  }

  return (
    <>
      <Form.Item noStyle name="statusProcessMonitoring" valuePropName="checked">
        <Switch disabled={disabled_switch}/>
      </Form.Item>
      &nbsp;{description}
    </>
  )
}

export default ImportButton
