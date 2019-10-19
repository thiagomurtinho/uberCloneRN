import React from 'react';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Warning: componentWillReceiveProps has been renamed',
    'Warning: componentWillUpdate has been renamed',
    'Warning: componentWillReceiveProps has been renamed',
    'Warning: componentWillMount has been renamed',
]);

import Map from './components/Map';

const App = () => <Map />;

export default App;
