mapModule
    .factory('MeasurementTool', MeasurementTool);
MeasurementTool.$inject = ['mapService'];

function MeasurementTool(mapService) {
    return function MeasurementTool(map) {
        var wgs84Sphere = new ol.Sphere(6378137);
        var source = new ol.source.Vector();
        var isLineMeasurementEnabled=false;
        var isAreaMeasurementEnabled=false;
        var lineMeasurementEvent=undefined;
        var areaMeasurementEvent=undefined;
        var measurementOverlays=[];

        var vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        /**
         * Currently drawn feature.
         * @type {ol.Feature}
         */
        var sketch;


        /**
         * The help tooltip element.
         * @type {Element}
         */
        var helpTooltipElement;


        /**
         * Overlay to show the help messages.
         * @type {ol.Overlay}
         */
        var helpTooltip;


        /**
         * The measure tooltip element.
         * @type {Element}
         */
        var measureTooltipElement;


        /**
         * Overlay to show the measurement.
         * @type {ol.Overlay}
         */
        var measureTooltip;


        /**
         * Message to show when the user is drawing a polygon.
         * @type {string}
         */
        var continuePolygonMsg = 'Click to continue drawing the polygon';


        /**
         * Message to show when the user is drawing a line.
         * @type {string}
         */
        var continueLineMsg = 'Click to continue drawing the line';

        /**
         * Handle pointer move.
         * @param {ol.MapBrowserEvent} evt
         */
        var pointerMoveHandler = function(evt) {
            if (evt.dragging) {
                return;
            }
            /** @type {string} */
            var helpMsg = 'Click to start drawing';
            /** @type {ol.Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;

            if (sketch) {
                var output;
                var geom = (sketch.getGeometry());
                if (geom instanceof ol.geom.Polygon) {
                    output = formatArea( /** @type {ol.geom.Polygon} */ (geom));
                    helpMsg = continuePolygonMsg;
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength( /** @type {ol.geom.LineString} */ (geom));
                    helpMsg = continueLineMsg;
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            }

            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);
        };
        map.addLayer(vector);
        /**
         * format length output
         * @param {ol.geom.LineString} line
         * @return {string}
         */
        var formatLength = function(line) {
            var length;
            //   if (geodesicCheckbox.checked || true) {
            //     var coordinates = line.getCoordinates();
            //     length = 0;
            //     var sourceProj = map.getView().getProjection();
            //     for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            //       var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
            //       var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
            //       length += wgs84Sphere.haversineDistance(c1, c2);
            //     }
            //   } else {
            length = Math.round(line.getLength() * 100) / 100;
            //   }
            var output;
            if (length > 100) {
                output = (Math.round(length / 1000 * 100) / 100) +
                    ' ' + 'km';
            } else {
                output = (Math.round(length * 100) / 100) +
                    ' ' + 'm';
            }
            return output;
        };


        /**
         * format length output
         * @param {ol.geom.Polygon} polygon
         * @return {string}
         */
        var formatArea = function(polygon) {
            var area;
            //   if (geodesicCheckbox.checked) {
            //     var sourceProj = map.getView().getProjection();
            //     var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
            //         sourceProj, 'EPSG:4326'));
            //     var coordinates = geom.getLinearRing(0).getCoordinates();
            //     area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
            //   } else {
            area = polygon.getArea();
            //   }
            var output;
            if (area > 10000) {
                output = (Math.round(area / 1000000 * 100) / 100) +
                    ' ' + 'km<sup>2</sup>';
            } else {
                output = (Math.round(area * 100) / 100) +
                    ' ' + 'm<sup>2</sup>';
            }
            return output;
        };
        var draw; // global so we can remove it later
        function addInteraction(type) {
            //   var type = (typeSelect.value == 'area' ? 'Polygon' : 'LineString');
            // var type = 'LineString';
            draw = new ol.interaction.Draw({
                source: source,
                type: /** @type {ol.geom.GeometryType} */ (type),
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 0.7)'
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)'
                        })
                    })
                })
            });
            mapService.addInteraction(draw);

            createMeasureTooltip();
            createHelpTooltip();

            draw.on('drawstart',
                function(evt) {
                    // set sketch
                    sketch = evt.feature;
                }, this);

            draw.on('drawend',
                function(evt) {
                    measureTooltipElement.className = 'tooltip tooltip-static';
                    measureTooltip.setOffset([0, -7]);
                    // unset sketch
                    sketch = null;
                    // unset tooltip so that a new one can be created
                    measureTooltipElement = null;
                    createMeasureTooltip();
                }, this);
        }
        /**
         * Creates a new help tooltip
         */
        function createHelpTooltip() {
            if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            }
            helpTooltipElement = document.createElement('div');
            helpTooltipElement.className = 'tooltip';
            helpTooltip = new ol.Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left'
            });
            //Will be added later if needed;
            // map.addOverlay(helpTooltip);
        }


        /**
         * Creates a new measure tooltip
         */
        function createMeasureTooltip() {
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'tooltip tooltip-measure';
            measureTooltip = new ol.Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center'
            });
            map.addOverlay(measureTooltip);
            measurementOverlays.push(measureTooltip);
        }

        function enableLineMeasurementEvent() {
            // mapService.removeEvents();
            // mapService.removeUserInteractions();
            lineMeasurementEvent = mapService.registerEvent('pointermove', pointerMoveHandler);
            addInteraction('LineString');
            isLineMeasurementEnabled=true;
        }
        function disableLineMeasurementEvent() {
            if(lineMeasurementEvent) {
                mapService.removeEvent(lineMeasurementEvent);
                mapService.removeInteraction(draw);
                isLineMeasurementEnabled=false;
            }
        }

        function enableAreaMeasurementEvent() {
            // mapService.removeEvents();
            // mapService.removeUserInteractions();
            areaMeasurementEvent =mapService.registerEvent('pointermove', pointerMoveHandler);
            addInteraction('Polygon');
            isAreaMeasurementEnabled=true;
        }
        function disableAreaMeasurementEvent() {
            if(areaMeasurementEvent) {
                mapService.removeEvent(areaMeasurementEvent);
                mapService.removeInteraction(draw);
                isAreaMeasurementEnabled=false;
            }
        }

        this.lineMeasurement = function() {
            if(!isLineMeasurementEnabled) enableLineMeasurementEvent();
            else disableLineMeasurementEvent();
            return isLineMeasurementEnabled;
        };
        this.areaMeasurement = function() {
            if(!isAreaMeasurementEnabled) enableAreaMeasurementEvent();
            else disableAreaMeasurementEvent();
            return isAreaMeasurementEnabled;
        };
        this.clearDrawings=function () {
            if(source){
                source.clear();
                angular.forEach(measurementOverlays,function (overlay) {
                    overlay.setPosition(undefined);
                })
            }
        }

    };
}