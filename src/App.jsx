import { useState, useCallback, useRef } from 'react'
import { ToastContainer } from 'react-toastify'
import ReactFlow, { useEdgesState, useNodesState, addEdge, MarkerType, ReactFlowProvider } from 'reactflow'
import { Analytics } from '@vercel/analytics/react';
import { styled } from 'styled-components'
import SidePanel from './components/SidePanel'
import { NODE_TYPES, getId, showMessage } from './constants/utils'
import Navbar from './components/Navbar'
import TextNode from './components/TextNode'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import 'reactflow/dist/style.css'

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

  // Check if number of nodes with connected handles is atmost one less than total nodes
  const handleSaveChanges = useCallback(() => {
    const possibleIds = new Set(nodes.map(el => el.id))
    const allTargets = new Set(edges.map(el => el.id))

    if (nodes.length === 0 || (possibleIds.size-allTargets.size > 1)) {
      showMessage("Cannot save Flow", "error")
    }
    else {
      showMessage("Flow saved!", "success")
    }
  }, [nodes, edges])

  // Interaction event callbacks on the reactflow component

  // Callback to handle when user drops the draggable component
  // into the reactflow svg area
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
      type: NODE_TYPES.TEXT,
      position,
      selectable: true,
      selected: false,
      data: { channel: "whatsapp", text: "Click to edit!", id }
    }
    setNodes(prev => prev.concat(newNode))
  }, [instance])

  // Callback to handle addition of edges when connecting two nodes
  const handleConnect = useCallback((e) => setEdges((eds) => addEdge(e, eds)), [])
  
  // Callback to define drop effect when draggable is dragged over svg area
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  // Callback to update node text value when settings textarea is being edited
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
            multiSelectionKeyCode={false}
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
      <Analytics />
    </div>
  )
}

export default App
