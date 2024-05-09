"use client"

import React, { useState, useEffect } from 'react'
import { Box, Stack, NativeSelect, Button, Collapse, Paper, CloseButton, Text  } from '@mantine/core'

function QuestionsTab() {

    const [partyList, setPartyList] = useState('');
    const [donorList, setDonorList] = useState('');
    const [q1Answer, setQ1Answer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);

    const getPartyList = (event : any) => {
        fetch("http://localhost:3001/questions/q1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                donor: event.target.value
            })
        }).then(res => res.json())
            .then(data => {
                console.log("data", data)
                setQ1Answer(data)
            })    
    }

    const handleClose = () => {
        setShowAnswer(false);
    };


    useEffect(() => {

        fetch("http://localhost:3001/staticData/total", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then(data => {
                const {formattedData, formattedDataPurchase} = data
                const plist = formattedData.map((item:any) => item.name)
                const dlist = formattedDataPurchase.map((item:any)=>item.name)
                setPartyList(plist)
                setDonorList(dlist)
        })


    }, [])

    return (
    <Stack
        bg="#f8f9fa" align="flex-start" justify="center" gap="md" spacing="xs"
        style={{margin:'20px'}}   
    >

            <Box style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginLeft: 50 }}>
                Give me the list of political parties 
                <NativeSelect size="xs" radius="xl" data={donorList}
                    onChange={getPartyList}
                    style={{ width: 250, marginLeft: 10, marginRight: 10 }} />
                donated to
                <Button color="blue" variant="filled" size="xs" radius="md"
                    onClick={() => setShowAnswer(!showAnswer)}
                    style={{ marginLeft: 10 }}>?</Button>        
            </Box>
            <Collapse in={showAnswer} style={{ width: '700px', marginLeft:'45px', marginRight:'20px' }}>
                <Paper withBorder shadow="sm" p="md" mt="md" radius="md" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CloseButton onClick={handleClose} size="xs" />
                    </div>
                    <ul >
                        {q1Answer && q1Answer.map((item, index) => (
                            <li key={index}>
                                <Text size="sm">{item.Political_Party}</Text>
                            </li>
                        ))}
                    </ul>
                </Paper>               
            </Collapse>

            <Box style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginLeft:50 }}>
                Give me the list of donors 
                <NativeSelect size="xs" radius="xl" data={partyList}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                    received donation from
                <span>
                    <Button color="blue" variant="filled" size="xs" radius="md"
                    style={{marginLeft:10}}>?</Button>        
                </span>
            </Box>  

            <Box style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginLeft:50 }}>
                Who is the largest donor to 
                <NativeSelect size="xs" radius="xl" data={partyList}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                <span>
                    <Button color="blue" variant="filled" size="xs" radius="md"
                    style={{marginLeft:10}}>?</Button>        
                </span> 
            </Box>  

            <Box style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginLeft:50 }}>
                How much 
                <NativeSelect size="xs" radius="xl" data={donorList}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                donated to 
                <NativeSelect size="xs" radius="xl" data={partyList}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                <span>
                    <Button color="blue" variant="filled" size="xs" radius="md"
                    style={{marginLeft:10}}>?</Button>        
                </span>
            </Box>  

            <Box style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginLeft:50 }}>
                How much 
                <NativeSelect size="xs" radius="xl" data={partyList}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                received donation in
                <NativeSelect size="xs" radius="xl" data={['FY20', 'FY21', 'FY22', 'FY23', 'FY24']}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                <span>
                    <Button color="blue" variant="filled" size="xs" radius="md"
                    style={{marginLeft:10}}>?</Button>        
                </span>
            </Box>  

            <Box style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginLeft:50 }}>
                From which states has the 
                <NativeSelect size="xs" radius="xl" data={partyList}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                received donations 
                <span>
                    <Button color="blue" variant="filled" size="xs" radius="md"
                    style={{marginLeft:10}}>?</Button>        
                </span>
            </Box>  

    </Stack>
  )
}

export default QuestionsTab