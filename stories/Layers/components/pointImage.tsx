import { PointImageLayer, PointLayer } from '@l7/layers';
import { Scene } from '@l7/scene';
import * as React from 'react';
import data from '../data/data.json';
export default class PointImage extends React.Component {
  private scene: Scene;

  public componentWillUnmount() {
    this.scene.destroy();
  }

  public async componentDidMount() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json',
    );
    const scene = new Scene({
      center: [121.40, 31.258134],
      zoom: 15,
      id: 'map',
      pitch: 0,
      type: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v9',
    });
    scene.addImage(
      '00',
      'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*Rq6tQ5b4_JMAAAAAAAAAAABkARQnAQ',
    );
    scene.addImage(
      '01',
      'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*0D0SQ6AgkRMAAAAAAAAAAABkARQnAQ',
    );
    scene.addImage(
      '02',
      'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*o16fSIvcKdUAAAAAAAAAAABkARQnAQ',
    );
    this.scene = scene;
    scene.on('loaded', () => {
      run();
    });
    const imageLayer = new PointImageLayer({})
      .source(await response.json(), {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        }
      })
      .shape('name', ['00', '01', '02'])
      .size(60);
    scene.addLayer(imageLayer);

    function run() {
      scene.render();
      console.log('render');
      requestAnimationFrame(run);
    }
    this.scene = scene;
  }

  public render() {
    return (
      <div
        id="map"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    );
  }
}