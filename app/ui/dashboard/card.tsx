import { Record } from "@/app/lib/definitions"
import { Card, IconButton, Stack, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { useState } from "react"

type Props = {
  record: Record,
  onRecordDelete: (id: string) => void,
}

export function DashboardCard(props: Props) {
  const {
    record,
    onRecordDelete,
  } = props

  const [aiText, setAiText] = useState(record.ai_text ?? '')
  const [text, setText] = useState(record.text)

  const handleRecordUpdate = async () => {
    const res = await fetch(`/api/dashboard/${record.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        ai_text: aiText,
      })
    })
    if (res.ok) {
      alert('Record updated!')
    } else {
      alert('Failed to update record!')
    }
  }

  const handleRecordDelete = async () => {
    const res = await fetch(`/api/dashboard/${record.id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      alert('Record deleted!')
      onRecordDelete(record.id)
    } else {
      alert('Failed to delete record!')
    }
  }

  return (
    <Card sx={{ p: 2 }}>
      <img src={record.image_path.replace('public', '')} alt={record.text} style={{ maxWidth: '100%'}} />
      <TextField
        multiline
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 1, mt: 1 }}
        label="Text"
      />
      <TextField
        multiline
        fullWidth
        value={aiText}
        onChange={(e) => setAiText(e.target.value)}
        label="AI Text"
      />
      <Stack spacing={2} direction="row" justifyContent={'flex-end'} sx={{ mt: 2 }}>
        <IconButton title="Save changes" color="primary" onClick={handleRecordUpdate}>
          <SaveIcon />
        </IconButton>
        <IconButton title="Delete record" color="error" onClick={handleRecordDelete}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  )
}
