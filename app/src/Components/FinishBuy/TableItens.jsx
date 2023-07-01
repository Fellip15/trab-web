import React from "react";
import "./TableItens.css";

const TableItensFinishBuy = ({ itens }) => {
    const makeItemRow = (item) => {
        return (<tr>
            <td className="tg-c3ow">{item.name}</td>
            <td className="tg-c3ow">x{item.amount}</td>
            <td className="tg-c3ow">R$ {item.price}</td>
        </tr>)
    };
    
    const makeRowsItens = (itens) => {
        return itens.map((item) => makeItemRow(item));
    };

    const calcTotalPrice = (itens) => {
        let totalPrice = 0;
        console.log(itens);
        for (let item of itens) {
            totalPrice += Number(item.price) * Number(item.amount);
        }

        return totalPrice;
    };

    return (
        <>
        <table class="tg">
            <thead>
                <tr>
                    <th className="tg-title">Nome</th>
                    <th className="tg-title">Qtde</th>
                    <th className="tg-title">Valor</th>
                </tr>
            </thead>
            <tbody>
                {makeRowsItens(itens)}
                <tr>
                    <th colspan="2" className="tg-total">Total:</th>
                    <th className="tg-tota">R${calcTotalPrice(itens).toFixed(2)}</th>
                </tr>
            </tbody>
        </table>
        </>
    );
};

export default TableItensFinishBuy;