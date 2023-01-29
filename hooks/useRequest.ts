import { useState } from 'react';
import { api } from '../lib/axios';
import { AxiosRequestConfig } from 'axios';

type Status = 'loading' | 'success' | 'error'

interface RequestProps {
  data: any;
  status: Status | null;
  error: string | null
}

const defaultValues = {
  data: null,
  status: null,
  error: null
}

export function useRequest() {
  const [request, setRequest] = useState<RequestProps>(defaultValues)

  const execute = (options: AxiosRequestConfig) => {
    setRequest({...defaultValues, status: 'loading'})

    api(options)
      .then((response) => {
        const data = response.data
        setRequest({ data, status: 'success', error: null })
      })
      .catch((err) => {
        const error = err.response?.data.error || 'unknown_error'
        setRequest({ data: null, status: 'error', error })
      })
  }

  return { request, execute }
}