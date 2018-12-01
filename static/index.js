/*** @jsx React.DOM */

const client = new KeenTracking({
    projectId: '5be3aaf5c9e77c0001a123fd',
    writeKey: 'D2FE41FA2EA97A351B5263FC80F5F8DC2ED510DFA655E4397207C901481A44C5F4C0E46D8242F649A3A62C2775AA025C491F784B7D4FCD1C8BA4D4A57BDCDC86A67A88FDD324E2F62987FC40D0DC83B66633E23199188AFE62BC2E1D48AA7F83'
});

var IDFun = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const userID = IDFun();
console.log(userID);

function getData(){
  return new Promise(function(resolve, reject) {
    d3.json('/getFeatures', function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    })
  })
}

getData()
  .then(function(data) {
    //console.log(data)
    ReactDOM.render(
        <AppInterface
            features={data.featureData}
            classNames={data.classNames}
            description={data.description}
            targetName={data.targetName}
        />,
      document.getElementById('root')
    );
  })



/*
<AppInterface
            dotSrc={data.dotSrc}
            markovBlanketSelected={data.markovBlanketSelected}
            graph={data.graph}
            features={data.featureData}
            isEdgeSelected={data.isEdgeSelected}
            isNodeSelected={data.isNodeSelected}
            classNames={data.classNames}
        />,


data={data.histogramData}
featureData={data.featureData}
summaryData={data.summaryData}
featureDistribution={data.featureDistribution}

<AppInterface
            dotSrc={data.dotSrc}
            markovBlanketSelected={data.markovBlanketSelected}
            graph={data.graph}
            isEdgeSelected={data.isEdgeSelected}
            isNodeSelected={data.isNodeSelected}
            featureData={data.featureData}
            featureSchema={data.featureSchema}
            classNames={data.classNames}
            markovBlanket={data.markovBlanket}
            MI={data.MI}
            consistencyMB={data.consistencyMB}
        />,
*/
