"use client"

import React, { useState, useEffect } from 'react'
import { Box, Stack, NativeSelect, Button, Collapse, Paper, CloseButton, Text  } from '@mantine/core'

function QuestionsTab() {

    const [partyList, setPartyList] = useState([]);
    const [donorList, setDonorList] = useState([]);
    const [q1showAnswer, q1setShowAnswer] = useState(false);
    const [q1Answer, setQ1Answer] = useState([]);
    const [q2showAnswer, q2setShowAnswer] = useState(false);
    const [q2Answer, setQ2Answer] = useState([]); 
    const [q3showAnswer, q3setShowAnswer] = useState(false);
    const [q3Answer, setQ3Answer] = useState([]);   
    const [q4showAnswer, q4setShowAnswer] = useState(false);
    const [q4Answer, setQ4Answer] = useState([]);  
    const [q4Donor, setQ4Donor] = useState<null | string>(null)
    const [q5showAnswer, q5setShowAnswer] = useState(false);
    const [q5Answer, setQ5Answer] = useState([]);  
    const [q5Party, setQ5Party] = useState<null | string>(null)
    const [q6showAnswer, q6setShowAnswer] = useState(false);
    const [q6Answer, setQ6Answer] = useState([]);  


    const getPartyList = (event : any) => {
        fetch("api/questions/q1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                donor: event.target.value
            })
        }).then(res => res.json())
            .then(data => {
                setQ1Answer(data)
            })    
    }

    const getDonorList = (event: any) => { 
        fetch("api/questions/q2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                party: event.target.value
            })
        }).then(res => res.json()).
            then((data) => {
            setQ2Answer(data)
        })
    }

    const getLargestDonor = (event: any) => {
        fetch("api/questions/q3", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                party: event.target.value 
            })
        }).then((res) => res.json()).
            then((data) => {
                setQ3Answer(data)
            })
    }

    const getLargestAmount = (event: any) => {
        fetch("api/questions/q4", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                donor : q4Donor,
                party: event.target.value 
            })
        }).then((res) => res.json()).
            then((data:any) => {
                setQ4Answer(data)
                console.log("q4", data)
            })
    }

    const getFYAmount = (event: any) => {
        fetch("api/questions/q5", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                party: q5Party,
                FY: event.target.value
            })
        }).then(res => res.json()).
            then((data : any) => {
            setQ5Answer(data)
        })
    }

    const getStateList = (event: any) => {
        fetch("api/questions/q6", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                party:event.target.value
            })
        }).then(res => res.json()).
            then((data) => 
            setQ6Answer(data) )
    }

    const handleClose = () => {
        q1setShowAnswer(false);
    };

    const handleClose2 = () => {
        q2setShowAnswer(false);
    };

    const handleClose3 = () => {
        q3setShowAnswer(false);
    };

    const handleClose4 = () => {
        q4setShowAnswer(false);
    };

    const handleClose5 = () => {
        q5setShowAnswer(false);
    };

    const handleClose6 = () => {
        q6setShowAnswer(false);
    };


    useEffect(() => {

        fetch("api/bond", {
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
        bg="#f8f9fa" align="flex-start" justify="center" style={{ margin: '20px' }}   
    >

            <Box style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginLeft: 50 }}>
                Give me the list of political parties 
                <NativeSelect size="xs" radius="xl" data={donorList}
                    onChange={getPartyList}
                    style={{ width: 250, marginLeft: 10, marginRight: 10 }} />
                donated to
                <Button color="blue" variant="filled" size="xs" radius="md"
                    onClick={() => q1setShowAnswer(!q1showAnswer)}
                    style={{ marginLeft: 10 }}>?</Button>        
            </Box>
            <Collapse in={q1showAnswer} style={{ width: '700px', marginLeft:'45px', marginRight:'20px' }}>
                <Paper withBorder shadow="sm" p="md" mt="md" radius="md" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CloseButton onClick={handleClose} size="xs" />
                    </div>
                    <ul >
                        {q1Answer && q1Answer.map((item : any, index: any) => (
                            <li key={index}>
                                <Text size="sm">{item.Political_Party}</Text>
                            </li>
                        ))}
                    </ul>
                </Paper>               
            </Collapse>

            <Box style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginLeft:50 }}>
                Give me the list of donors 
                <NativeSelect onChange={getDonorList} size="xs" radius="xl" data={partyList}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                    received donation from
                <span>
                    <Button color="blue" variant="filled" size="xs" radius="md"
                    style={{marginLeft:10}} onClick={() => q2setShowAnswer(!q2showAnswer)}>?</Button>        
                </span>
            </Box>  
            <Collapse in={q2showAnswer} style={{ width: '700px', marginLeft:'45px', marginRight:'20px' }}>
                <Paper withBorder shadow="sm" p="md" mt="md" radius="md" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CloseButton onClick={handleClose2} size="xs" />
                    </div>
                    <ul >
                        {q2Answer && q2Answer.map((item : any, index: any) => (
                            <li key={index}>
                                <Text size="sm">{item.purchaser}</Text>
                            </li>
                        ))}
                    </ul>
                </Paper>               
            </Collapse>

            <Box style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginLeft:50 }}>
                Who is the largest donor to 
                <NativeSelect
                    onChange={getLargestDonor}
                    size="xs" radius="xl" data={partyList}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                <span>
                    <Button
                        onClick={() => q3setShowAnswer(!q3showAnswer)}
                        color="blue" variant="filled" size="xs" radius="md"
                    style={{marginLeft:10}}>?</Button>        
                </span> 
            </Box> 
            <Collapse in={q3showAnswer} style={{ width: '700px', marginLeft:'45px', marginRight:'20px' }}>
                <Paper withBorder shadow="sm" p="md" mt="md" radius="md" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CloseButton onClick={handleClose3} size="xs" />
                    </div>
                    <ul >
                        {q3Answer && q3Answer.map((item : any, index: any) => (
                            <li key={index}>
                                <Text size="sm">{item.name}</Text>
                            </li>
                        ))}
                    </ul>
                </Paper>               
            </Collapse>

            <Box style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginLeft:50 }}>
                How much 
                <NativeSelect
                    onChange={(event) => {setQ4Donor(event.currentTarget.value)}}                    
                    size="xs" radius="xl" data={donorList}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                donated to 
                <NativeSelect
                    onChange={getLargestAmount}                    
                    size="xs" radius="xl" data={partyList}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                <span>
                    <Button
                    onClick={() => q4setShowAnswer(!q4showAnswer)}                        
                    color="blue" variant="filled" size="xs" radius="md"
                    style={{marginLeft:10}}>?</Button>        
                </span>
            </Box>  
            <Collapse in={q4showAnswer} style={{ width: '700px', marginLeft:'45px', marginRight:'20px' }}>
                <Paper withBorder shadow="sm" p="md" mt="md" radius="md" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CloseButton onClick={handleClose4} size="xs" />
                    </div>
                    <ul >
                        {q4Answer && q4Answer.map((item : any, index: any) => (
                            <li key={index}>
                                <Text size="sm">
                                    {
                                        item.value ? `${parseInt(item.value, 10) / 10000000} cr` : "nil"     
                                    }
                                </Text>
                            </li>
                        ))}
                    </ul>
                </Paper>               
            </Collapse>

            <Box style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginLeft:50 }}>
                How much 
                <NativeSelect
                    onChange={(event) => {setQ5Party(event.currentTarget.value)}}
                    size="xs" radius="xl" data={partyList}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                received donation in
                <NativeSelect
                    onChange={getFYAmount}
                    size="xs" radius="xl" data={['FY20', 'FY21', 'FY22', 'FY23', 'FY24']}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                <span>
                    <Button
                    onClick={() => q5setShowAnswer(!q5showAnswer)}
                    color="blue" variant="filled" size="xs" radius="md"
                    style={{marginLeft:10}}>?</Button>        
                </span>
            </Box>  
            <Collapse in={q5showAnswer} style={{ width: '700px', marginLeft:'45px', marginRight:'20px' }}>
                <Paper withBorder shadow="sm" p="md" mt="md" radius="md" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CloseButton onClick={handleClose5} size="xs" />
                    </div>
                    <ul >
                        {q5Answer && q5Answer.map((item : any, index: any) => (
                            <li key={index}>
                                <Text size="sm">
                                    {
                                        item.value ? `${parseInt(item.value, 10) / 10000000} cr` : "nil"     
                                    }
                                </Text>
                            </li>
                        ))}
                    </ul>
                </Paper>               
            </Collapse>

            <Box style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginLeft:50 }}>
                From which states has the 
                <NativeSelect
                    onChange={getStateList}
                    size="xs" radius="xl" data={partyList}
                    style={{ width: 250, marginLeft:10, marginRight:10, }} />
                received donations 
                <span>
                    <Button
                    onClick={() => q6setShowAnswer(!q6showAnswer)}    
                    color="blue" variant="filled" size="xs" radius="md"
                    style={{marginLeft:10}}>?</Button>        
                </span>
            </Box>  

            <Collapse in={q6showAnswer} style={{ width: '700px', marginLeft:'45px', marginRight:'20px' }}>
                <Paper withBorder shadow="sm" p="md" mt="md" radius="md" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CloseButton onClick={handleClose6} size="xs" />
                    </div>
                    <ul >
                        {q6Answer && q6Answer.map((item : any, index: any) => (
                            <li key={index}>
                                <Text size="sm">{item.state}</Text>
                            </li>
                        ))}
                    </ul>
                </Paper>               
            </Collapse>

    </Stack>
  )
}

export default QuestionsTab