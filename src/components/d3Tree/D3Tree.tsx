import Tree, { Point } from "react-d3-tree";
import { DIRECTORY_EMPLOYEE_DATA } from "../directory1/data";
import "./d3Tree.css";
import { D3TreeInput, buildD3Tree } from "./utils";
import { useCenteredTree } from "../../hooks";
import { Card, Container, Flex, Group, Stack, Text } from "@mantine/core";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { ImageWrapper } from "../wrappers";
import { GoldenGrid } from "../accessibleInputs/GoldenGrid";

function renderForeignObjectNode({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}: {
  nodeDatum: any;
  toggleNode: () => void;
  foreignObjectProps: React.SVGProps<SVGForeignObjectElement>;
}) {
  /**
   * <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}>
        <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
        {nodeDatum.children && (
          <button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </button>
        )}
      </div>
   */

  const button = (
    <AccessibleButton
      attributes={{
        kind: nodeDatum.__rd3t.collapsed ? "expand" : "collapse",
        onClick: toggleNode,
        enabledScreenreaderText: `${
          nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"
        } subordinates`,
      }}
    />
  );

  const profilePic = (
    <ImageWrapper
      creatorInfoObject={{
        imageSrc: nodeDatum.attributes.profilePictureUrl,
        imageAlt: nodeDatum.name,
        fit: "cover",
        customWidth: 50,
        customRadius: 9999,
        customHeight: 50,
      }}
    />
  );

  const foreignChild = (
    <Flex direction="column">
      {Object.entries(nodeDatum.attributes).map(([key, value]) =>
        key === "profilePictureUrl" ? null : (
          <Text key={`${key}-${value}`}>{value as string}</Text>
        )
      )}
    </Flex>
  );

  const [firstName, middleName, lastName] = nodeDatum.name.split(" ");

  const foreignCard = (
    <Card shadow="sm" padding="md" radius="md" withBorder maw={200} mah={250}>
      <Stack w="100%">
        <GoldenGrid>
          <Flex h="100%" direction="column" align="center" justify="center">
            {profilePic}
          </Flex>
          <Flex direction="column">
            <Text>{firstName}</Text>
            <Text>{middleName}</Text>
            <Text>{lastName}</Text>
          </Flex>
        </GoldenGrid>
        {foreignChild}
        {nodeDatum.children.length ? button : null}
      </Stack>
    </Card>
  );

  return (
    <g>
      <circle r={15} fill={nodeDatum.children.length ? "gray" : "transparent"} />
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject {...foreignObjectProps}>{foreignCard}</foreignObject>
    </g>
  );
}

function D3Tree({ data }: { data: Array<D3TreeInput> }) {
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 400, y: 400 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 15, y: 15 };
  const containerStyles = { width: "100vw", height: "100vh" };

  return (
    <div style={containerStyles} ref={containerRef as any}>
      <Tree
        branchNodeClassName="node__branch"
        data={data}
        leafNodeClassName="node__leaf"
        nodeSize={nodeSize}
        orientation="vertical"
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        rootNodeClassName="node__root"
        translate={translate as Point}
      />
    </div>
  );
}

export { D3Tree };
