"use client"
import React, { useEffect } from 'react';
import Landing from '@/app/pages/landing';
import Header from '../components/header';
import { useRecoilState } from 'recoil';
import { CartState } from './state/atoms/CartState';


const page = () => {
  return (
    <>
    {/* <Header /> */}
    <Landing />
    </>
  )
}

export default page