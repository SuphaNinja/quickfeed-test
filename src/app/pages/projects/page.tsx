"use client"


import { useAuth } from '@/providers/QueryProvider';
import React from 'react'
import Header from '../../../components/projects/Header';
import ProjectsList from '../../../components/projects/ProjectList';

export default function ProjectsPage() {
  const { currentUser, isLoading } = useAuth();
  console.log(currentUser)
  return (
    <div>
      <Header />
      <ProjectsList />
    </div>
  )
}
