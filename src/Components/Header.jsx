import React from 'react';

const Header = ({ scramble, updateScramble }) => (
    <header className="col-span-3 bg-gray-800 text-white flex items-center justify-center p-4 h-24">
        <div className="flex items-center space-x-4">
            <div className="text-3xl">Scramble: {scramble}</div>
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={updateScramble}
        >
            New
        </button>
        </div>
    </header>
);

export default Header;
