import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import React from 'react'
import { useSelector } from 'react-redux'

const AppliedJobs = () => {
  const {allAppliedJobs} = useSelector(store=>store.job);
  return (
    <div>
      <Table>
        <TableCaption>
          This is a the table.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>JobRole</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            allAppliedJobs.length>=0 && allAppliedJobs.map((appliedJob)=>{
              return(
                <TableRow key={appliedJob?._id}>
                  <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob?.job?.title}</TableCell>
                  <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                  <TableCell className="text-right"><Badge className={`${appliedJob?.status=="rejected" ? 'bg-red-400' : appliedJob?.status == "pending" ? 'bg-gray-400' : 'bg-green-500'}`}>{appliedJob?.status.toUpperCase()}</Badge></TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobs

