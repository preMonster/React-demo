import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';

import main from '../main.js';
import SimpleSelectButton from '../containers/demo_select.js';
import SimpleSelectButtonCopy from '../containers/demo_selectCopy.js';
import Mydesk from '../containers/Mydesk/mydesk.js';
import TableList from '../containers/table/tableList.js';
import TransferList from '../containers/transfer.js';
import LineChartList from '../containers/rechars/lineChartList.js';
import BarChartList from '../containers/rechars/barChartList.js';
import PieChartList from '../containers/rechars/pieChartList.js';
import RadarChartList from '../containers/rechars/radarChartList.js';
import ScatterChartList from '../containers/rechars/scatterChartList.js';
import ModalList from '../containers/modal/modalList.js';
import FormList from '../containers/form/formList.js';
import Login from '../containers/login/login.js';
import FormCard from '../compoents/form/formCard.js';

let enter = function(nextState, replace){

}

// 配置路由
export default  (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/" component={main} onEnter={enter}>
      <IndexRoute component={Mydesk}/>
      <Route path="mydesk" component={Mydesk} />
      <Route path="SimpleSelectButton" component={SimpleSelectButton} />
      <Route path="SimpleSelectButtonCopy" component={SimpleSelectButtonCopy} />
      <Route path="table" component={TableList} />
      <Route path="transfer" component={TransferList} />
      <Route path="lineChart" component={LineChartList} />
      <Route path="barChart" component={BarChartList} />
      <Route path="pieChart" component={PieChartList} />
      <Route path="radarChart" component={RadarChartList} />
      <Route path="scatterChart" component={ScatterChartList} />
      <Route path="modalList" component={ModalList} />
      <Route path="formList" component={FormList} />
      <Route path="formList/formCard" component={FormCard} />
    </Route>
  </Route>
);
