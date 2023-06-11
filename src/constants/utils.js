import images from "./images"

let id = 0

export const getId = () => `node_${id++}`

export const CHANNELS = {
    WHATSAPP: "WHATSAPP",
    INSTAGRAM: "INSTAGRAM",
    SHOPIFY: "SHOPIFY"
}

export const NODE_TYPES = {
    TEXT: "textNode",
    CATALOGUE: "catalogue"
}

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
