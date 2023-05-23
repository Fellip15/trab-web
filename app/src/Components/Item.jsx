import React, { useState } from 'react';

function Item() {
  return (
    <div class="item">
        <img src="img/produtos/ilha1.png" alt="Ilha" class="item-img"/>
        <div class="frame-7">
            <p class="item-name font-inter-white">Nome da ilha aqui!</p>
            <p class="item-price font-inter-white">R$ 9999999,99</p>
        </div>
    </div>
  );
}

export default Item;
