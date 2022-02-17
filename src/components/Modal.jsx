/**
 * Modal
 * @package components
 */

import React from "react";

export const Modal = () => {
  return (
    <div>
      <div id="overlay">
        <div id="modalContent">
          <h2>ログイン画面</h2>
          <button>閉じる</button>
        </div>
      </div>
    </div>
  );
};
