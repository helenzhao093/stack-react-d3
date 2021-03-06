class FeatureHistogramBin extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render(){
    const binData = this.props.data
    //console.log(Object.keys(this.props.data.tp))
    //console.log(this.props.data.tp["awesome"]["awesome"])
    var TP = Object.keys(binData.TP).map((key, index) =>
      <VerticalHistogramBar
        className={'bin' + this.props.binNum}
        width={this.props.xScale.bandwidth()}
        height={this.props.yScale(this.props.data.TP[key][key].count)}
        x={this.props.xScale(this.props.binNum)}
        y={this.props.height - this.props.yScale(this.props.data.TP[key][key].count + this.props.data.TP[key][key].previousSum)}
        fill={this.props.color(this.props.data.TP[key][key].target)}
        />
    )

    var FP = Object.keys(binData.FP).map((predicted_key) =>
      Object.keys(this.props.data.FP[predicted_key]).map((target_key) =>
        <VerticalHistogramBar
          className={'bin' + this.props.binNum}
          width={this.props.xScale.bandwidth()}
          height={this.props.yScale(this.props.data.FP[predicted_key][target_key].count)}
          x={this.props.xScale(this.props.binNum)}
          y={this.props.height - this.props.yScale(this.props.data.FP[predicted_key][target_key].count + this.props.data.FP[predicted_key][target_key].previousSum)}
          fill={ 6 == 7 ? this.props.color(this.props.data.FP[predicted_key][target_key].predicted) : this.props.color(this.props.data.FP[predicted_key][target_key].target)}
          />
        )
    )

    var FN = Object.keys(binData.FN).map((target_key) =>
      Object.keys(this.props.data.FN[target_key]).map((predicted_key) =>
        <VerticalHistogramBar
          className={'hi'}
          width={this.props.xScale.bandwidth()}
          height={this.props.yScale(this.props.data.FN[target_key][predicted_key].count)}
          x={this.props.xScale(this.props.binNum)}
          y={this.props.height - this.props.yScale(this.props.data.FN[target_key][predicted_key].count + this.props.data.FN[target_key][predicted_key].previousSum)}
          fill={ 7== 7 ? this.props.color(this.props.data.FN[target_key][predicted_key].predicted) : this.props.color(this.props.data.FN[target_key][predicted_key].target)}
          />
        )
    )

    return (
      <g className={'bin'}>
        {TP}
        {FP}
        {FN}
      </g>
    )
  }
}


class FeatureHistogram extends React.Component {
  constructor(props) {
    super(props)
    //console.log(props)
    // xScale, xScaleDomain, yScale, sizes

    this.state = {
      histogramWidth: props.size[0] - props.margin.left - props.margin.right,
      histogramHeight:  props.size[1] - props.margin.top - props.margin.bottom
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render(){
    console.log('render feature histogram')
    const continuous = 'continuous'
    var xAxisDomain = (this.props.featureType == continuous) ? this.props.data.map((bin, index) =>
      (this.props.featureRange[1] - this.props.featureRange[0]) / this.props.numBins * (index + 1) + this.props.featureRange[0]) :
      this.props.featureValues

    var xScaleDomain = (this.props.featureType == continuous) ?
      this.props.data.map((bin, index) => index) :
      this.props.featureValues.map((value, index) => index)

    var xScale = d3.scaleBand()
      .domain(xScaleDomain)
      .rangeRound([0, this.state.histogramWidth]).padding(0.1)

    //var xAxisDomainEveryOther = xAxisDomain.filter((x, index) => index % 2 == 0)
    var xScaleAxis = d3.scaleBand()
      .domain(xAxisDomain)
      .rangeRound([0, this.state.histogramWidth])

    var yScale = d3.scaleLinear()
      .domain([0, this.props.max])
      .rangeRound([0, this.state.histogramHeight])

    var yScaleAxis = d3.scaleLinear()
      .domain([this.props.max, 0])
      .rangeRound([0, this.state.histogramHeight])

    var xAxis = (this.props.featureType == continuous) ? d3.axisBottom(xScaleAxis).tickFormat(d3.format(".3n")) : d3.axisBottom(xScaleAxis)
    var yAxis = d3.axisLeft(yScaleAxis)

    var bins = this.props.data.map((bin, index) =>
      <FeatureHistogramBin
        bottom={this.props.margin.bottom}
        data={bin}
        binNum={index}
        xScale={xScale}
        yScale={yScale}
        color={this.props.colorFunction}
        height={this.state.histogramHeight}
      />
    )

    return (
      <svg className={'featureDistribution'} width={this.props.size[0]} height={this.props.size[1]}>
        <g transform={`translate(${this.props.margin.left},${this.props.margin.top})`}>
          {bins}
        </g>
        <HistogramYAxis name={'x-axis-feature' + this.props.index} axis={xAxis} left={this.props.margin.left } top={this.props.margin.top + this.state.histogramHeight}/>
        <HistogramYAxis name={'y-axis-feature' + this.props.index} axis={yAxis} left={this.props.margin.left } top={this.props.margin.top}/>
        <text
          style={{fontSize: 12}}
          x={this.props.size[0]/2 - 5}
          y={this.props.size[1]}
        >{this.props.featureName}</text>
      </svg>
    )
  }
}
