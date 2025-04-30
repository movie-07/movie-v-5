'use client'
import React from 'react'

import { Card, Button, Form, Input } from 'antd'
import Link from 'next/link'
const Login = () => {
  const login = (values) => {
    console.log(values)
  }
  return (
    <div className='flex bg-gray-100 h-screen justify-center items-center'>
      <Card hoverable className='w-6/12 shadow-lg'>
        <h1 className='text-2xl font-semibold mb-4'> Login </h1>
        <Form layout='vertical' onFinish={login}>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true }]}>

            <Input size='large' placeholder='type your email' />
          </Form.Item>
          <Form.Item
            label="Pasword"
            name="pasword"
            rules={[{ required: true }]}>

            <Input size='large' placeholder='type your pasword' />
          </Form.Item>
          <Form.Item>
            <Button size='large' htmlType='submit' type='primary'> Log-in</Button>
          </Form.Item>
        </Form>
        <div className=' flex item-center gap-3'>
          <label>
            do't have a accouny
          </label>
          <Link href="/signup" className=' text-blue-600 font-medium'> register now </Link>
        </div>
      </Card>
    </div>
  )
}

export default Login
