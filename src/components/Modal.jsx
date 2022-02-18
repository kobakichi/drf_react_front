/**
 * Modal
 * @package components
 */

import React from "react";

export const Modal = (props) => {
  const { showFlag, closeModal } = props;

  /**
   * showFlagがtrueだったらModalを表示する三項演算子
   */
  return (
    <div>
      {showFlag ? (
        <div className="overlay">
          <div className="modalContent">
            <h2>ログイン画面</h2>
            <form>
              <table className="login">
                <tr>
                  <th>メールアドレス</th>
                  <td>
                    <input type="email" />
                  </td>
                </tr>
                <tr>
                  <th>パスワード</th>
                  <td>
                    <input type="password" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <button onClick={closeModal}>閉じる</button>
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
