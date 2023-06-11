import { useState, useCallback, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import ReactFlow, { useEdgesState, useNodesState, addEdge, MarkerType, ReactFlowProvider } from 'reactflow'
import { styled } from 'styled-components'
import SidePanel from './components/SidePanel'
import Navbar from './components/Navbar'
import TextNode from './components/TextNode'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import 'reactflow/dist/style.css'
import { getId } from './constants/utils'

const FlowContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  @media only screen and (max-width: 768px) {
    flex-flow: column-reverse;
  }
`

// Reactflow configuration objects
const nodeTypes = { textNode: TextNode }

const defaultEdgeOptions = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#ccc",
    width: 20,
    height: 20
  }
}

function App() {
  const flowWrapper = useRef()
  const [instance, setInstance] = useState()
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const handleSaveChanges = useCallback(() => {
    const possibleIds = new Set(nodes.map(el => el.id))
    const allTargets = new Set(edges.map(el => el.id))

    if (possibleIds.size-allTargets.size > 1) {
      toast("Cannot save Flow", {
        className: "errorMessage",
        position: toast.POSITION.TOP_CENTER,
      })
    }
    else {
      toast("Flow saved!", {
        className: "errorMessage",
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }, [nodes])

  // Interaction event callbacks on the reactflow component
  const handleTargetDrop = useCallback(e => {
    e.preventDefault()
    const bounds = flowWrapper.current.getBoundingClientRect()
    const type = e.dataTransfer.getData("application/reactflow")
    if (!type) {
      return
    }
    const position = instance.project({
      x: e.clientX-bounds.left,
      y: e.clientY-bounds.top
    })
    const id = getId()
    const newNode = {
      id,
      type: "textNode",
      position,
      selectable: true,
      selected: false,
      data: { channel: "whatsapp", text: "Click to edit!", id }
    }
    setNodes(prev => prev.concat(newNode))
  }, [instance])

  const handleConnect = useCallback((e) => setEdges((eds) => addEdge(e, eds)), [])
  
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const handleTextNodeEdit = useCallback((value, selectedId) => {
    setNodes(prev => prev.map(el => el.id === selectedId? 
      { 
        ...el,
        data: { ...el.data, text: value },
      }: el))
  }, [])

  return (
    <div id="mainContent">
      <Navbar saveChanges={handleSaveChanges} />
      <ReactFlowProvider>
        <FlowContainer ref={flowWrapper}>
          <ReactFlow
            onInit={setInstance}
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onDragOver={handleDragOver}
            onDrop={handleTargetDrop}
            onConnect={handleConnect}
            defaultEdgeOptions={defaultEdgeOptions}
          />
          <SidePanel
            handleTextNodeEdit={handleTextNodeEdit}
          />
        </FlowContainer>
      </ReactFlowProvider>
      <ToastContainer
        closeOnClick
        theme="colored"
        hideProgressBar
        closeButton={false}
        autoClose={2000}
      />
    </div>
  )
}

export default App
