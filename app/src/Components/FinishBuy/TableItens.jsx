import React from "react";
import "./TableItens.css";

const TableItensFinishBuy = ({ itens }) => {
    const makeItemRow = (item) => {
        return (<tr>
            <td className="tg-c3ow">{item.name}</td>
            <td className="tg-c3ow">{item.amount}</td>
            <td className="tg-c3ow">R$ {(item.price * item.amount).toFixed(2)}</td>
        </tr>)
    };
    const makeRowsItens = (itens) => {
        return itens.map((item) => makeItemRow(item));
    };
    return (
        <table class="tg">
            <thead>
            <tr>
                <th className="tg-c3ow">Nome</th>
                <th className="tg-c3ow">Qtde</th>
                <th className="tg-c3ow">Total</th>
            </tr>
            </thead>
            <tbody>
                {makeRowsItens(itens)}
            </tbody>
        </table>
    );
};

export default TableItensFinishBuy;