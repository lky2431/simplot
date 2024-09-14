import { GraphDataType } from '../types/handleTypes';
import { NodeBase } from '@xyflow/system';

export type HandlesRef = {
    handlesType: {
        [propName:string]: GraphDataType
    }
} & Record<string, unknown>



export type HandleNode<NodeData extends HandlesRef = HandlesRef, NodeType extends string = string> = NodeBase<NodeData, NodeType> & {
    style?: React.CSSProperties;
    className?: string;
    resizing?: boolean;
    focusable?: boolean;
}