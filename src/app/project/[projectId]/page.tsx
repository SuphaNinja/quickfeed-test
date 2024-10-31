"use client"

import ProjectRoom from '@/components/projectroom/ProjectRoom'
import SearchUsers from '@/components/projectroom/SearchUsers'
import React, { useState } from 'react'

function ProjectRoomPage() {

    const [isOpen, setIsOpen] = useState(false)

    const handleIsOpen = () => {
        setIsOpen(!isOpen)
        console.log("toggling")
    }

  return (
    <div className='flex gap-12'>
          <ProjectRoom handleIsOpen={handleIsOpen} isOpen={isOpen} />
        <SearchUsers isOpen={isOpen} />
    </div>
  )
}

export default ProjectRoomPage