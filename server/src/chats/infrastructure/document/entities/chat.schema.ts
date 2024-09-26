import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/users/domain/user";
import { EntityDocumentHelper } from "src/utils/document-entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { Room } from "src/rooms/domain/room";
import { HydratedDocument } from 'mongoose';

export type ChatSchemaDocument = HydratedDocument<ChatSchemaClass>;

@Schema({
    timestamps: true,
    
})

export class ChatSchemaClass extends EntityDocumentHelper {
    @Prop({ required: true })
    content: string;

    @ApiProperty({
        type: String,
    })
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name, autopopulate: true })
    sender_id: User['id'];

    @ApiProperty({
        type: String,
    })
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Room.name })
    room_id: Room['id'];
}

export const ChatSchema = SchemaFactory.createForClass(ChatSchemaClass);
