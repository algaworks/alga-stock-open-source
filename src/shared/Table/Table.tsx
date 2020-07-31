import React from 'react'
import { Edit, Visibility, Delete } from '@material-ui/icons'
import {
  Table as MTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@material-ui/core'
import './Table.scss'
import organizeData from '../../utils/organizeDataForTable'

export interface TableHeader {
  key: string
  value: string
  right?: boolean
}
declare interface TableProps {
  headers: TableHeader[]
  data: any[]

  enableActions?: boolean
  
  onDelete?: (item : any) => void
  onDetail?: (item : any) => void
  onEdit?: (item : any) => void
}

const Table: React.FC<TableProps> = (props) => {
  const [organizedData, indexedHeaders] = organizeData(props.data, props.headers)

  return <TableContainer component={Paper}>
      <MTable>
        <TableHead>
          <TableRow>
            {
              props.headers.map(header =>
                <TableCell
                  align={header.right ? 'right' : 'left'}
                  key={header.key}
                >
                  {header.value}
                </TableCell>
              )
            }
            {
              props.enableActions
                && <TableCell align="right">
                  Actions
                </TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            organizedData.map((row, i) => {
              return <TableRow key={i}>
                {
                  Object
                    .keys(row)
                    .map((item, i) =>
                      item !== '$original'
                        ? <TableCell
                            key={row.$original.id + i}
                            align={indexedHeaders[item].right ? 'right' : 'left'}
                          >
                            { row[item] }
                          </TableCell>
                        : null
                    )
                }

                {
                  props.enableActions
                    && <TableCell align="right">
                      {
                        props.onEdit &&
                        <IconButton
                          onClick={() => props.onEdit && props.onEdit(row)}
                          color="primary"
                          size="small"
                          
                        >
                          <Edit fontSize="inherit" />
                        </IconButton>
                      }
                      {
                        props.onDetail &&
                          <IconButton
                            onClick={() => props.onDetail && props.onDetail(row)}
                            size="small"
                            color="primary"
                          >
                            <Visibility fontSize="inherit" />
                          </IconButton>
                      }
                      {
                        props.onDelete &&
                          <IconButton
                            onClick={() => props.onDelete && props.onDelete(row)}
                            color="primary"
                            size="small"
                          >
                            <Delete fontSize="inherit" />
                          </IconButton>
                      }
                    </TableCell>
                }
              </TableRow>
            })
          }
        </TableBody>
      </MTable>
  </TableContainer>
  
}

export default Table
