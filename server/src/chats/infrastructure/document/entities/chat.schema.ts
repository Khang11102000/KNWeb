import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/users/domain/user";
import { EntityDocumentHelper } from "src/utils/document-entity-helper";
import { ApiProperty } from "@nestjs/swagger";
import { Room } from "src/rooms/domain/room";
import { HydratedDocument, now } from 'mongoose';

export type ChatSchemaDocument = HydratedDocument<ChatSchemaClass>;

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    }
})

export class ChatSchemaClass extends EntityDocumentHelper {
    @Prop({ required: true })
    content: string;

    @ApiProperty({
        type: String,
    })
    @Prop({ required: true, type: String, ref: User.name, autopopulate: true })
    sender_id: User['id'];

    @ApiProperty({
        type: String,
    })
    @Prop({ required: true, type: String, ref: Room.name })
    room_id: Room['id'];
    
    @Prop({ default: now })
    createdAt: Date;

    @Prop({ default: now })
    updatedAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(ChatSchemaClass);
