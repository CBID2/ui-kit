import { css } from '@emotion/css'
import { Story } from '@storybook/react'
import React from 'react'
import { RelativeTimeRange, Sort } from '../../helpers'
import { Leaderboard } from './index'

export default {
  title: 'React/Leaderboard',
  argTypes: {
    query: {
      table: {
        disable: true
      }
    }
  }
}

const barHeaders = ['DATA_SOURCE_TYPE', 'value']

const barRows = [
  ['Http', '7498734'],
  ['Snowflake', '6988344'],
  ['S3', '203245'],
  ['Redshift', '19594']
]

const tableHeaders = ['Book title', 'Total sold']

const tableRows = [
  ["John's way or Highway", '12863002'],
  ['How to Speak Native Animal', '7865371'],
  ['Cell Lost in a Sea of Desert', '622027'],
  ['Flying nowhere special', '462791'],
  ['The Lean Product Book', '1']
]

const customTableHeaders = ['Song title', 'Artist', 'Total listens']

const customTableRows = [
  ["John's way or Highway", 'John Doe', '12863002'],
  ['How to Speak Native Animal', 'John Doe', '10865371'],
  ['Cell Lost in a Sea of Desert', 'John Doe', '9922027'],
  ['Flying nowhere special', 'John Doe', '8822027'],
  ['The Lean Product Book', 'John Doe', '7722027'],
  ["John's way or Highway", 'John Doe', '6622027'],
  ['How to Speak Native Animal', 'John Doe', '5522027'],
  ['Cell Lost in a Sea of Desert', 'John Doe', '4422027'],
  ['Flying nowhere special', 'John Doe', '3322027'],
  ['The Lean Product Book', 'John Doe', '2222027']
]

const Template: Story = (args) => <Leaderboard {...args} />
export const DefaultBar = Template.bind({})
DefaultBar.args = {
  headers: barHeaders,
  rows: barRows
}

export const DefaultTable = Template.bind({})
DefaultTable.args = {
  variant: 'table',
  headers: tableHeaders,
  rows: tableRows
}

export const ValueBarTable = Template.bind({})
ValueBarTable.args = {
  variant: 'table',
  headers: tableHeaders,
  rows: tableRows,
  styles: {
    table: {
      hasValueBar: true,
      valueColumn: {
        localize: true
      }
    }
  }
}

export const Connected = Template.bind({})
Connected.args = {
  variant: 'table',
  headers: [process.env.STORYBOOK_DIMENSION_1, process.env.STORYBOOK_DIMENSION_2, process.env.STORYBOOK_DIMENSION_3],
  query: {
    accessToken: process.env.STORYBOOK_PROPEL_ACCESS_TOKEN,
    metric: process.env.STORYBOOK_METRIC_UNIQUE_NAME_1,
    timeRange: {
      relative: RelativeTimeRange.LastNDays,
      n: 30
    },
    rowLimit: 10,
    dimensions: [
      {
        columnName: process.env.STORYBOOK_DIMENSION_1
      },
      {
        columnName: process.env.STORYBOOK_DIMENSION_2
      },
      {
        columnName: process.env.STORYBOOK_DIMENSION_3
      }
    ],
    sort: Sort.Asc
  },
  styles: {
    table: {
      hasValueBar: true
    },
    canvas: {
      height: 500
    }
  }
}

export const Error = Template.bind({})
Error.args = {
  query: {}
}

export const Loading = () => {
  const [loading, setLoading] = React.useState(true)
  const [localHeaders, setLocalHeaders] = React.useState<string[]>()
  const [localRows, setLocalRows] = React.useState<string[][]>()

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      setLocalHeaders(barHeaders)
      setLocalRows(barRows)
    }, 1000)
  }, [])

  return <Leaderboard loading={loading} headers={localHeaders} rows={localRows} />
}

const CustomTemplate: Story = (args) => (
  <div
    className={css`
      width: 500px;
      height: 250px;
      padding: 10px;

      color: #1db954;

      border: 1px solid black;
      border-radius: 10px;

      background-color: #191414;
    `}
  >
    <h3>Spotify most listened songs</h3>
    <Leaderboard {...args} />
  </div>
)
export const CustomStyles = CustomTemplate.bind({})
CustomStyles.args = {
  variant: 'table',
  headers: customTableHeaders,
  rows: customTableRows,
  styles: {
    font: {
      color: '#1DB954'
    },
    table: {
      stickyHeader: true,
      height: '200px',
      hasValueBar: true,
      backgroundColor: '#191414',
      header: {
        backgroundColor: '#282828',
        font: {
          weight: 'bold',
          size: '14px'
        }
      },
      valueBar: {
        backgroundColor: '#545454'
      },
      valueColumn: {
        align: 'center',
        localize: true
      },
      columns: {
        align: 'center'
      }
    }
  }
}
