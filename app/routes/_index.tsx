/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import io from 'socket.io-client';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Chat com Socket.io' },
		{ name: 'description', content: 'Tutorial de chat com Socket.io!' },
	];
};

type Message = {
	id: number;
	text: string;
};

export default function Index() {
	const [name, setName] = useState('');
	const [chatStarted, setChatStarted] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentMessage, setCurrentMessage] = useState('');
	const socket = io('http://localhost:3000');

	socket.on('connect', () => {
		console.log('Conectado ao servidor!');
	});

	socket.on('greeting', (message) => {
		console.log(message);
	});

	const handleSendMessage = () => {
		const newMessage = { id: messages.length + 1, text: currentMessage };
		setMessages([...messages, newMessage]);
	};

	// input com o nome do usuário
	// lista de mensagens trocadas
	// input + botão para enviar mensagem
	return (
		<div className="flex flex-col p-12 items-center justify-center gap-4">
			<h1>Chat com Socket.io</h1>
			{chatStarted ? (
				<div>
					<h1>Conversa iniciada</h1>
					<div className="flex flex-col gap-4">
						<p>Olá {name}</p>
						<div className="min-h-96 border border-gray-100 rounded">
							<ul>
								{messages.length === 0 && <li>Nenhuma mensagem</li>}
								{messages.map((message) => (
									<li key={message.id}>{message.text}</li>
								))}
							</ul>
						</div>
						<div className="flex gap-2">
							<input
								onChange={(e) => setCurrentMessage(e.target.value)}
								className="border border-gray-200 focus:border-gray-400 p-2"
							/>
							<button
								onClick={handleSendMessage}
								className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg"
							>
								enviar
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className="flex gap-4">
					<input
						type="text"
						placeholder="Digite seu nome"
						onChange={(e) => setName(e.target.value)}
						className="border border-gray-200 focus:border-gray-400 p-2"
					/>
					<button
						onClick={() => setChatStarted(true)}
						className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg"
					>
						entrar
					</button>
				</div>
			)}
		</div>
	);
}
