"use client";
import clsx from "clsx";
import React from "react";
import Header from "@/app/(user)/_components/header";
import Sidebar from "@/app/(user)/_components/sidebar";
import Loading from "@/components/shared/loading";
import { ReactNode, Suspense } from "react";
import userLayoutStyles from "./user-layout.module.scss";
import { usePathname } from "next/navigation";
import ListFriend from "@/app/(user)/_components/list-friend";
import {
    Avatar,
    Button,
    Divider,
    Flex,
    Layout,
    List,
    Typography,
    Input,
} from "antd";
import { SmileOutlined, SendOutlined } from "@ant-design/icons";
import { io, Socket } from "socket.io-client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import messageService from "@/services/user/message-service";
import { useSession } from "next-auth/react";
import { MessageContext } from "./context/messageContext";

const { Sider } = Layout;
const { Search } = Input;

interface IRoom {
    id: string;
    type: string;
    name: string;
    member: string[];
    avatar: string;
}
export type RoomInfo = {
    id: string;
    name: string;
    avt: string;
};
const UserLayout = ({ children }: { children: ReactNode }) => {
    const { data: session, status } = useSession();
    const params = useParams<{ id: string }>();
    const searchParams = useSearchParams()
    const router = useRouter();
    const socket: any = React.useRef();
    const [listRooms, setListRooms] = React.useState<IRoom[]>([]);

    React.useMemo(() => {
        socket.current = io("http://localhost:800/chats", {
            auth: {
                userId: session?.user.id
            },
            extraHeaders: {
                Authorization: `Bearer ${session?.token}`,
            },
        });

    }, [session && session.token, socket])

    React.useMemo(() => {
        socket.current.emit("get-room", {
            userId: session?.user.id,
        });
        socket.current.on("room-data", (rooms: any) => {
            if (rooms && rooms?.length > 0) {
                setListRooms(rooms);
            }
        });
    }, [session && session.user.id]);


    const handleClickRoomListItem = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        roomTarget: RoomInfo
    ) => {
        const target = e.target as HTMLTextAreaElement
        router.push(`/message/${roomTarget.id}?name=${roomTarget.name}&avt=${roomTarget.avt || ""}`);

        e.preventDefault();
    };

    return (
        <Flex wrap align="center" style={{ height: "100vh", width: "100%" }}>
            <Layout style={layoutStyle}>
                <Sider width={350} theme="light" style={siderStyle}>
                    <Flex style={activeChatStyle}>
                        <Typography.Title level={3}>Actives: 0</Typography.Title>
                    </Flex>
                    <Flex style={usersOnlineStyle} vertical>
                        <Flex style={{ width: "100%", padding: "15px 10px" }}>
                            <Search placeholder="Search for chat" onSearch={() => { }} />
                        </Flex>
                        <Flex style={{ width: "100%", padding: "15px 10px" }}>
                            <List
                                size="large"
                                style={{ width: "100%" }}
                                bordered
                                dataSource={listRooms}
                                renderItem={(room) => (
                                    <List.Item
                                        id={room.id}
                                        style={{
                                            padding: "16px 15px",
                                            cursor: "pointer",
                                            backgroundColor: `${room.id === params.id ? "#9ea5b5" : "#FFF"
                                                }`,
                                        }}
                                        onClick={(e) =>
                                            handleClickRoomListItem(e, {
                                                id: room.id,
                                                name: room.name,
                                                avt: room.avatar,
                                            })
                                        }
                                    >
                                        <Flex justify="center" align="center">
                                            <Flex justify="center" align="center">
                                                <Avatar size={48} src={room.avatar} />
                                            </Flex>
                                            <Flex
                                                vertical
                                                justify="center"
                                                align="start"
                                                style={{ marginLeft: "5px" }}
                                            >
                                                <Typography.Title level={5}>
                                                    {room.name}
                                                </Typography.Title>
                                                <Typography.Paragraph style={{ margin: "0px" }}>
                                                    This is a copyable.
                                                </Typography.Paragraph>
                                            </Flex>
                                        </Flex>
                                    </List.Item>
                                )}
                            />
                        </Flex>
                    </Flex>
                </Sider>
                <Suspense fallback={<Loading />}>
                    {socket && socket.current && socket.current.connected && <MessageContext.Provider
                        value={{
                            room: {
                                id: params.id,
                                name: searchParams.get('name'),
                                avt: searchParams.get('avt')
                            },
                            socket: socket.current,
                            session: session
                        }}
                    >
                        <div style={{ flex: 1 }}>{children}</div>
                    </MessageContext.Provider>}

                </Suspense>
            </Layout >
        </Flex >
    );
};
const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(60% - 8px)",
    // maxWidth: 'calc(60% - 8px)',
    height: "70%",
    minHeight: "700px",
};

const siderStyle: React.CSSProperties = {
    textAlign: "start",
    lineHeight: "90px",
    color: "#fff",
};
const activeChatStyle: React.CSSProperties = {
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    width: "inherit",
    height: "90px",
    minHeight: "90px",
    borderBottom: "1px solid #d9dbd9",
};
const usersOnlineStyle: React.CSSProperties = {
    textAlign: "start",
    lineHeight: "120px",
    color: "#fff",
    width: "inherit",
};
export default UserLayout;
