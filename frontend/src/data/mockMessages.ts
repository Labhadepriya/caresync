
export type MessageStatus = "Sent" | "Delivered" | "Read";

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: MessageStatus;
}

export interface Conversation {
  id: string;
  participantName: string;
  role: string;
  department: string;
  avatarInitials: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const currentUserId = "user-current";

export const mockConversations: Conversation[] = [
  {
    id: "CON-1001",
    participantName: "Dr. Neha Desai",
    role: "Physician",
    department: "General Medicine",
    avatarInitials: "ND",
    isOnline: true,
    lastMessage: "The patient review is complete.",
    lastMessageTime: "10:42 AM",
    unreadCount: 2,
  },
  {
    id: "CON-1002",
    participantName: "Dr. Amit Kulkarni",
    role: "Physician",
    department: "Cardiology",
    avatarInitials: "AK",
    isOnline: true,
    lastMessage: "Please check the appointment schedule.",
    lastMessageTime: "10:15 AM",
    unreadCount: 1,
  },
  {
    id: "CON-1003",
    participantName: "Priya Sharma",
    role: "Nurse",
    department: "Emergency",
    avatarInitials: "PS",
    isOnline: false,
    lastMessage: "The handover notes are ready.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
  {
    id: "CON-1004",
    participantName: "Rahul Patil",
    role: "Lab Technician",
    department: "Diagnostics",
    avatarInitials: "RP",
    isOnline: false,
    lastMessage: "The sample processing is complete.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
  {
    id: "CON-1005",
    participantName: "Ananya Joshi",
    role: "Receptionist",
    department: "Front Desk",
    avatarInitials: "AJ",
    isOnline: true,
    lastMessage: "The visitor has arrived.",
    lastMessageTime: "Mon",
    unreadCount: 0,
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: "MSG-1001",
    conversationId: "CON-1001",
    senderId: "ND",
    text: "Good morning! Have you reviewed today's patient list?",
    timestamp: "10:30 AM",
    status: "Read",
  },
  {
    id: "MSG-1002",
    conversationId: "CON-1001",
    senderId: currentUserId,
    text: "Yes, I have reviewed the list. Everything looks ready.",
    timestamp: "10:35 AM",
    status: "Read",
  },
  {
    id: "MSG-1003",
    conversationId: "CON-1001",
    senderId: "ND",
    text: "The patient review is complete.",
    timestamp: "10:42 AM",
    status: "Delivered",
  },
  {
    id: "MSG-1004",
    conversationId: "CON-1002",
    senderId: "AK",
    text: "Please check the appointment schedule.",
    timestamp: "10:15 AM",
    status: "Read",
  },
  {
    id: "MSG-1005",
    conversationId: "CON-1003",
    senderId: "PS",
    text: "The handover notes are ready.",
    timestamp: "Yesterday",
    status: "Read",
  },
  {
    id: "MSG-1006",
    conversationId: "CON-1004",
    senderId: "RP",
    text: "The sample processing is complete.",
    timestamp: "Yesterday",
    status: "Read",
  },
  {
    id: "MSG-1007",
    conversationId: "CON-1005",
    senderId: "AJ",
    text: "The visitor has arrived.",
    timestamp: "Mon",
    status: "Read",
  },
];
