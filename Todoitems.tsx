import React from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

interface TodoitemsProps {
  id: number;
  text: string;
  isCompleted: boolean;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const Todoitems: React.FC<TodoitemsProps> = ({ id, text, isCompleted, deleteTodo, toggleTodo }) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick={() => toggleTodo(id)} className='flex flex-1 items-center'>
        <img src={isCompleted ? tick : not_tick} alt='' className='w-7' />
        <p className={`text-slate-700 ml-4 text-[17px] ${isCompleted ? 'line-through' : ''}`}>{text}</p>
      </div>
      <img onClick={() => deleteTodo(id)} src={delete_icon} alt='' className='w-3.5' />
    </div>
  );
};

export default Todoitems;