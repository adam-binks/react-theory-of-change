import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid"
import clsx from "clsx"
import { useEffect, useMemo, useRef, useState } from "react"

interface Node {
  id: string
  title: string
  text: string
  connectionIds: string[]
}

interface ToCData {
  columns: {
    title: string
    nodes: Node[]
  }[]
}

export function ToC({ data }: { data: ToCData }) {
  const [nodeRefs, setNodeRefs] = useState<{
    [key: string]: HTMLDivElement | null
  }>({})
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(
    new Set(),
  )
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const updateNodeRef = (id: string, ref: HTMLDivElement | null) => {
    setNodeRefs((prev) => ({ ...prev, [id]: ref }))
  }

  const toggleHighlight = (id: string) => {
    setHighlightedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const connectedNodes = useMemo(() => {
    if (highlightedNodes.size === 0) {
      return new Set<string>()
    }

    const getConnectedNodes = (
      nodeId: string,
      startColumnIndex: number,
      visited: Set<string> = new Set(),
      direction: "outgoing" | "incoming" = "outgoing",
    ): Set<string> => {
      if (visited.has(nodeId)) return visited
      visited.add(nodeId)

      const nodeColumnIndex = data.columns.findIndex((col) =>
        col.nodes.some((n) => n.id === nodeId),
      )
      if (
        nodeColumnIndex === -1 ||
        (direction === "outgoing" && nodeColumnIndex < startColumnIndex) ||
        (direction === "incoming" && nodeColumnIndex > startColumnIndex)
      ) {
        return visited
      }

      const node = data.columns[nodeColumnIndex].nodes.find(
        (n) => n.id === nodeId,
      )
      if (!node) return visited

      if (direction === "outgoing") {
        // Check outgoing connections only in subsequent columns
        node.connectionIds.forEach((connectedId) => {
          getConnectedNodes(
            connectedId,
            nodeColumnIndex + 1,
            visited,
            "outgoing",
          )
        })
      } else {
        // Check incoming connections only in previous columns
        data.columns.slice(0, nodeColumnIndex).forEach((col) => {
          col.nodes.forEach((n) => {
            if (n.connectionIds.includes(nodeId)) {
              getConnectedNodes(n.id, startColumnIndex, visited, "incoming")
            }
          })
        })
      }

      return visited
    }

    const allConnectedNodes = new Set<string>()
    highlightedNodes.forEach((nodeId) => {
      const startColumnIndex = data.columns.findIndex((col) =>
        col.nodes.some((n) => n.id === nodeId),
      )
      if (startColumnIndex !== -1) {
        const outgoingSet = getConnectedNodes(
          nodeId,
          startColumnIndex,
          new Set(),
          "outgoing",
        )
        const incomingSet = getConnectedNodes(
          nodeId,
          startColumnIndex,
          new Set(),
          "incoming",
        )
        outgoingSet.forEach((id) => allConnectedNodes.add(id))
        incomingSet.forEach((id) => allConnectedNodes.add(id))
      }
    })

    return allConnectedNodes
  }, [highlightedNodes, data])

  const hoveredConnections = useMemo(() => {
    if (!hoveredNode) return new Set<string>()

    const connections = new Set<string>()
    connections.add(hoveredNode)

    data.columns.forEach((column) => {
      column.nodes.forEach((node) => {
        if (node.id === hoveredNode) {
          node.connectionIds.forEach((id) => connections.add(id))
        }
        if (node.connectionIds.includes(hoveredNode)) {
          connections.add(node.id)
        }
      })
    })

    return connections
  }, [hoveredNode, data])

  return (
    <div className="flex relative gap-16">
      {data.columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex-1">
          <h2
            className={clsx(
              "text-lg font-bold mb-4",
              columnIndex === 0 && "text-red-700",
              columnIndex === data.columns.length - 1 && "text-green-700",
              columnIndex !== 0 &&
                columnIndex !== data.columns.length - 1 &&
                "text-indigo-700",
            )}
          >
            {column.title}
          </h2>
          <div className="flex flex-col gap-2 justify-evenly h-full">
            {column.nodes.map((node) => (
              <Node
                key={node.id}
                node={node}
                updateNodeRef={updateNodeRef}
                isHighlighted={highlightedNodes.has(node.id)}
                isConnected={connectedNodes.has(node.id)}
                isHovered={hoveredNode === node.id}
                toggleHighlight={toggleHighlight}
                setHoveredNode={setHoveredNode}
                hasHighlightedNodes={highlightedNodes.size > 0}
              />
            ))}
          </div>
        </div>
      ))}
      <Connections
        data={data}
        nodeRefs={nodeRefs}
        highlightedNodes={highlightedNodes}
        connectedNodes={connectedNodes}
        hoveredConnections={hoveredConnections}
      />
    </div>
  )
}

function Connections({
  data,
  nodeRefs,
  highlightedNodes,
  connectedNodes,
  hoveredConnections,
}: {
  data: ToCData
  nodeRefs: { [key: string]: HTMLDivElement | null }
  highlightedNodes: Set<string>
  connectedNodes: Set<string>
  hoveredConnections: Set<string>
}) {
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      setSvgSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const connections = data.columns
    .flatMap((column, columnIndex) =>
      column.nodes.flatMap((node) =>
        node.connectionIds.map((connectionId) => {
          const targetColumnIndex = data.columns.findIndex((col) =>
            col.nodes.some((n) => n.id === connectionId),
          )
          return {
            start: nodeRefs[node.id],
            end: nodeRefs[connectionId],
            sourceColumnIndex: columnIndex,
            targetColumnIndex,
            sourceId: node.id,
            targetId: connectionId,
          }
        }),
      ),
    )
    .filter((connection) => connection.start && connection.end)

  const strokeWidth = 12
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      width={svgSize.width}
      height={svgSize.height}
    >
      {connections.map((connection, index) => {
        if (!connection.start || !connection.end) return null

        const startRect = connection.start.getBoundingClientRect()
        const endRect = connection.end.getBoundingClientRect()
        const containerRect = connection.start
          .closest(".flex.relative")
          ?.getBoundingClientRect()

        if (!containerRect) return null

        const startX =
          (connection.sourceColumnIndex < connection.targetColumnIndex
            ? startRect.right
            : startRect.left) - containerRect.left
        const startY = startRect.top + startRect.height / 2 - containerRect.top
        const endX =
          (connection.sourceColumnIndex < connection.targetColumnIndex
            ? endRect.left
            : endRect.right) - containerRect.left
        const endY = endRect.top + endRect.height / 2 - containerRect.top

        const controlPointOffset = Math.abs(endX - startX) / 2

        const isHighlighted =
          highlightedNodes.has(connection.sourceId) ||
          highlightedNodes.has(connection.targetId)
        const isConnected =
          connectedNodes.has(connection.sourceId) &&
          connectedNodes.has(connection.targetId)
        const isHovered =
          hoveredConnections.has(connection.sourceId) &&
          hoveredConnections.has(connection.targetId)
        const hasHighlightedNodes = highlightedNodes.size > 0
        const isLowOpacity =
          hasHighlightedNodes &&
          (!connectedNodes.has(connection.sourceId) ||
            !connectedNodes.has(connection.targetId))

        return (
          <path
            key={index}
            d={`M ${startX} ${startY} C ${startX + controlPointOffset * (connection.sourceColumnIndex < connection.targetColumnIndex ? 1 : -1)} ${startY}, ${endX - controlPointOffset * (connection.sourceColumnIndex < connection.targetColumnIndex ? 1 : -1)} ${endY}, ${endX} ${endY}`}
            className={clsx(
              "fill-none",
              isHovered
                ? "stroke-indigo-200"
                : isHighlighted
                  ? "stroke-indigo-300"
                  : isConnected
                    ? "stroke-indigo-300/60"
                    : "stroke-indigo-300/20",
            )}
            style={{
              strokeWidth: `${strokeWidth}px`,
              opacity: isLowOpacity ? 0.01 : 1,
            }}
          />
        )
      })}
    </svg>
  )
}

function Node({
  node,
  updateNodeRef,
  isHighlighted,
  isConnected,
  isHovered,
  toggleHighlight,
  setHoveredNode,
  hasHighlightedNodes,
}: {
  node: Node
  updateNodeRef: (id: string, ref: HTMLDivElement | null) => void
  isHighlighted: boolean
  isConnected: boolean
  isHovered: boolean
  toggleHighlight: (id: string) => void
  setHoveredNode: (id: string | null) => void
  hasHighlightedNodes: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateNodeRef(node.id, nodeRef.current)
  }, [node.id, updateNodeRef])

  const handleClick = () => {
    toggleHighlight(node.id)
  }

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(!expanded)
  }

  return (
    <div
      ref={nodeRef}
      className={clsx(
        "flex border rounded-lg cursor-pointer",
        isHighlighted
          ? "bg-indigo-200"
          : isHovered
            ? "bg-indigo-100"
            : "hover:bg-gray-100",
        hasHighlightedNodes && !isConnected && "opacity-30",
      )}
      onClick={handleClick}
      onMouseEnter={() => setHoveredNode(node.id)}
      onMouseLeave={() => setHoveredNode(null)}
    >
      <div className={clsx("flex-grow px-4 py-2", !node.text && "w-full")}>
        <div className="text-sm font-medium">{node.title}</div>
        {expanded && node.text && (
          <div className="text-sm mt-2">{node.text}</div>
        )}
      </div>
      {node.text && (
        <button
          className="flex shrink-0 items-center justify-center w-5 hover:bg-white rounded-r-lg"
          onClick={handleExpandClick}
        >
          {expanded ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  )
}
