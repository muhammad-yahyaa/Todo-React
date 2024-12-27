import React, { useEffect, useRef, useState } from 'react';
import Todoitems from './Todoitems';

interface TodoItem {
  id: number;
  text: string;
  isCompleted: boolean;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const Todo: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useState<TodoItem[]>(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')!) : []);
  const add = () => {
    if (inputRef.current) {
      const inputText = inputRef.current.value.trim();
      if (inputText === '') return;

      const newTodo: TodoItem = {
        id: Math.random(),
        text: inputText,
        isCompleted: false,
      };

      setTodoList((prev) => [...prev, newTodo]);
      inputRef.current.value = '';
    }
  };

  const deleteTodo = (id: number) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  },[todoList]);


  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      <div className='flex items-center mt-7 gap-2'>
        <h1 className='text-3xl font-bold'>TODO</h1>
      </div>

      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input
          ref={inputRef}
          onKeyUp={(e) => e.key === 'Enter' && add()}
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-16 pr-2 placeholder:text-slate-600'
          type='text'
          placeholder='Enter your Todo'
        />
        <button
          onClick={add}
          className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-semibold'
        >
          ADD
        </button>
      </div>

      <div>
        {todoList.map((item, index) => (
          <Todoitems
            text={item.text}
            key={index}
            id={item.id}
            isCompleted={item.isCompleted}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;