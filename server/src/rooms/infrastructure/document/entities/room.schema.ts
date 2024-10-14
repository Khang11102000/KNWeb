import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { RoomType } from "../../../enums/room-type.enum";
import { User } from "src/users/domain/user";
import { EntityDocumentHelper } from "src/utils/document-entity-helper";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    }
})
export class RoomSchemaClass extends EntityDocumentHelper {

    @ApiProperty({
        type: String,
    })
    @Prop({
        type: String,
    })
    name: string;
    @ApiProperty({
        type: RoomType,
    })
    @Prop({ enum: RoomType, default: RoomType.PERSONAL })
    type: RoomType;

    @Prop([{ type: String, 
        // ref: User.name, autopopulate: true
     }])
    members: string[];
    @Prop({
        type: String,
    })
    avatar: string;
    @Prop({
        type: String,
    })
    recentActive: Date;
}

export const RoomSchema = SchemaFactory.createForClass(RoomSchemaClass);

// export class RoomDocument {
//     _id: Types.ObjectId;
//     name: string;
//     type: RoomType;
//     members: User[];

//     constructor(props: Partial<RoomDocument>) {
//         this._id = props._id;
//         this.members = props.members;
//         this.name = props.name;
//         this.type = props.type;

//         if (this.type == RoomType.PERSONAL) {
//             this.name = this.members.find((member: any) => member._id.toString() !== this._id.toString()).name;
//         }
//     }
// }
