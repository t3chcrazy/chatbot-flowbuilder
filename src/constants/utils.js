import images from "./images"
import { toast } from 'react-toastify'

let id = 0

// Simple utility function to get unique id
export const getId = () => `node_${id++}`

// Different types of channels for which chat bot can be made
export const CHANNELS = {
    WHATSAPP: "WHATSAPP",
    INSTAGRAM: "INSTAGRAM",
    SHOPIFY: "SHOPIFY"
}

// Different types of nodes which can be supported
export const NODE_TYPES = {
    TEXT: "textNode",
    CATALOGUE: "catalogue"
}

// Utility function to get icons
export const mapChannelToIcons = channel => {
    switch (channel) {
        case CHANNELS.WHATSAPP:
            return { 
                icon: images.Message,
                type: "textNode",
                sideIcon: images.Whatsapp,
                title: "Messages"
            }
        default:
            return { icon: "", type: "default", sideIcon: "" }
    }
}

// Selector for useStore hook from zustand to access selected nodes
export const SELECTED_NODES_SELECTOR = state => Array.from(state.nodeInternals.values()).filter(el => el.selected)

// Function to show message at the top
export const showMessage = (message, theme) => {
    toast(message, {
        position: toast.POSITION.TOP_CENTER,
        style: theme === "success"? {
            background: "#2ecc71",
            color: "white",
            textAlign: "center"
        }: {
            background: "#ff9ff3",
            color: "white",
            textAlign: "center"
        }
    })
}