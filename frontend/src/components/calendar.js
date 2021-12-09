import React, { useState } from 'react';
import Calendar from 'react-calendar';

//리액트 캘린더 라이브러리
function MyApp() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
  );
}