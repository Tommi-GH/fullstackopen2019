import React, { useState } from 'react'
import axios from 'axios'

export const useResource = ({ baseUrl, token }) => {
    const bearerToken = `bearer ${token}`

    const getAll = () => {
        const request = axios.get(baseUrl)
        return request.then(response => response.data)
    }

    const create = async (newObject) => {
        const config = {
            headers: { Authorization: bearerToken },
        }
    }
}