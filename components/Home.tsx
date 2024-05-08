import React from 'react'
import { Tabs, Text } from '@mantine/core'
import Dashboard from '../components/Dashboard'
import QuestionsTab from '../components/QuestionsTab'

export default function Home() {

  return (
        <Tabs color="cyan" defaultValue="dashboard">
      
            <Tabs.List justify="center">
                <Tabs.Tab value="dashboard">
                    <Text fw={600}> Dashboard </Text>
                </Tabs.Tab>
              {/* <Tabs.Tab value="messages">
                  <Text fw={600}> Filter </Text>
                    
                </Tabs.Tab> */}
              <Tabs.Tab value="questions">
                  <Text fw={600}> Most Pertinent Questions </Text>
                    
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="dashboard">
                <Dashboard/>
            </Tabs.Panel>

            {/* <Tabs.Panel value="messages">
                
            </Tabs.Panel> */}

            <Tabs.Panel value="questions">
                <QuestionsTab/>
            </Tabs.Panel>
        </Tabs>
  )

}
