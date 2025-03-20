'use client'

import { Record } from "@/app/lib/definitions"
import { DashboardCard } from "@/app/ui/dashboard/card"
import { Alert, Stack } from "@mui/material"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [records, setRecords] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | unknown>(null)

  const getRecords = async () => {
    try {
      const res = await fetch('/api/dashboard', {
        method: 'GET',
      })
      if (res.ok) {
        const data = await res.json()
        setRecords(data.records)
      }
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRecords()
  }, [])

  const handleRecordDelete = (id: string) => {
    setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id))
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Something went wrong!</p>
  }

  return (
    <Stack spacing={2}>
      {records.length === 0 && <Alert severity="info">No records found!</Alert>}
      {records.map((record) => (
        <DashboardCard record={record} key={record.id} onRecordDelete={handleRecordDelete} />
      ))}
    </Stack>
  )
}