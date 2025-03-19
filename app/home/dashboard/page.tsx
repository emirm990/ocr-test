'use client'

import { Record } from "@/app/lib/definitions"
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

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Something went wrong!</p>
  }

  return (
    <div>
      {records.map((record) => (
        <div key={record.id}>
          <p>{record.text}</p>
          <p>{record.imagepath}</p>
        </div>
      ))}
    </div>
  )
}