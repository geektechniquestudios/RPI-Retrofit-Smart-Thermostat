import React, { Component } from 'react'
import Particles from 'react-particles-js'
import Snowfall from 'react-snowfall'
import Fader from 'react-fader'



class ParticleContainer extends Component {

  shouldTransition = () => {
    return false
  }

  render() {
    let isHot = this.props.temperature > 71
    return (
      <>
        <Fader>
          <Snowfall snowflakeCount={this.props.snowfall} />
        </Fader>
        <Particles
          shouldTransition={this.shouldTransition()}
          id="particles"
          params={{
            "detectRetina": true,
            "fpsLimit": 60,
            "infection": {
              "cure": false,
              "delay": 0,
              "enable": false,
              "infections": 0,
              "stages": []
            },
            "interactivity": {
              "detectsOn": "canvas",
              "events": {
                "onClick": {
                  "enable": true,
                  "mode": "push"
                },
                "onDiv": {
                  "ids": [],
                  "enable": false,
                  "mode": [],
                  "type": "circle"
                },
                "onHover": {
                  "enable": true,
                  "mode": "grab",
                  "parallax": {
                    "enable": true,
                    "force": 60,
                    "smooth": 10
                  }
                },
                "resize": true
              },
              "modes": {
                "attract": {
                  "distance": 200,
                  "duration": 0.4,
                  "speed": 1
                },
                "bubble": {
                  "distance": 400,
                  "duration": 2,
                  "opacity": 0.8,
                  "size": 40
                },
                "connect": {
                  "distance": 80,
                  "links": {
                    "opacity": 0.5
                  },
                  "radius": 60
                },
                "grab": {
                  "distance": 200,
                  "links": {
                    "opacity": 1
                  }
                },
                "push": {
                  "quantity": 4
                },
                "remove": {
                  "quantity": 2
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4,
                  "speed": 1
                },
                "slow": {
                  "factor": 3,
                  "radius": 200
                },
                "trail": {
                  "delay": 1,
                  "quantity": 1
                }
              }
            },
            "particles": {
              "collisions": {
                "enable": false,
                "mode": "bounce"
              },
              "color": {
                "value": "#302e07",
              },
              "links": {
                "blink": false,
                "color": {
                  "value": "#000"
                },
                "consent": false,
                "distance": 200,
                "enable": true,
                "opacity": 0.4,
                "shadow": {
                  "blur": 500,
                  "color": {
                    "value": "#00ff00"
                  },
                  "enable": false
                },
                "triangles": {
                  "enable": false
                },
                "width": 1,
                "warp": false
              },
              "move": {
                "angle": 90,
                "attract": {
                  "enable": false,
                  "rotate": {
                    "x": 600,
                    "y": 1200
                  }
                },
                "direction": "any",
                "enable": true,
                "noise": {
                  "delay": {
                    "random": {
                      "enable": true,
                      "minimumValue": 10
                    },
                    "value": 1
                  },
                  "enable": true
                },
                "outMode": "out",
                "random": false,
                "speed": 1,
                "straight": false,
                "trail": {
                  "enable": false,
                  "length": 10,
                  "fillColor": {
                    "value": "#000000"
                  }
                },
                "vibrate": false,
                "warp": false
              },
              "number": {
                "density": {
                  "enable": true,
                  "area": 800,
                  "factor": 2000,
                },
                "limit": 0,
                "value": 100
              },
              "opacity": {
                "animation": {
                  "enable": true,
                  "minimumValue": 0.1,
                  "speed": 0.1,
                  "sync": false
                },
                "random": {
                  "enable": true,
                  "minimumValue": 1
                },
                "value": 0.5
              },
              "shadow": {
                "blur": 0,
                "color": {
                  "value": "#000000"
                },
                "enable": false,
                "offset": {
                  "x": 0,
                  "y": 0
                }
              },
              "size": {
                "animation": {
                  "destroy": "none",
                  "enable": true,
                  "minimumValue": 0.1,
                  "speed": 3,
                  "startValue": "max",
                  "sync": false
                },
                "random": {
                  "enable": true,
                  "minimumValue": 1
                },
                "value": 5
              },
              "stroke": {
                "width": 0,
                "color": {
                  "value": "#000000",
                  "animation": {
                    "enable": false,
                    "speed": 1,
                    "sync": true
                  }
                }
              },
            },
            "pauseOnBlur": true
          }} />

        <Fader>
          {isHot &&
            <Particles
              id="particles"
              params={{
                "detectRetina": true,
                "fpsLimit": 60,
                "infection": {
                  "cure": false,
                  "delay": 0,
                  "enable": false,
                  "infections": 0,
                  "stages": []
                },
                "interactivity": {
                  "detectsOn": "canvas",
                  "events": {
                    "onClick": {
                      "enable": true,
                      "mode": "push"
                    },
                    "onDiv": {
                      "ids": [],
                      "enable": false,
                      "mode": [],
                      "type": "circle"
                    },
                    "onHover": {
                      "enable": true,
                      "mode": "grab",
                      "parallax": {
                        "enable": true,
                        "force": 60,
                        "smooth": 10
                      }
                    },
                    "resize": true
                  },
                  "modes": {
                    "attract": {
                      "distance": 200,
                      "duration": 0.4,
                      "speed": 1
                    },
                    "bubble": {
                      "distance": 400,
                      "duration": 2,
                      "opacity": 0.8,
                      "size": 40
                    },
                    "connect": {
                      "distance": 80,
                      "links": {
                        "opacity": 0.5
                      },
                      "radius": 60
                    },
                    "grab": {
                      "distance": 200,
                      "links": {
                        "opacity": 1
                      }
                    },
                    "push": {
                      "quantity": 4
                    },
                    "remove": {
                      "quantity": 2
                    },
                    "repulse": {
                      "distance": 200,
                      "duration": 0.4,
                      "speed": 1
                    },
                    "slow": {
                      "factor": 3,
                      "radius": 200
                    },
                    "trail": {
                      "delay": 1,
                      "quantity": 1
                    }
                  }
                },
                "particles": {
                  "collisions": {
                    "enable": false,
                    "mode": "bounce"
                  },
                  "color": {
                    "value": "#cf1800",

                  },
                  "links": {
                    "blink": false,
                    "color": {
                      "value": "#000"
                    },
                    "consent": false,
                    "distance": 200,
                    "enable": true,
                    "opacity": 0,
                    "shadow": {
                      "blur": 500,
                      "color": {
                        "value": "#00ff00"
                      },
                      "enable": false
                    },
                    "triangles": {
                      "enable": false
                    },
                    "width": 1,
                    "warp": false
                  },
                  "move": {
                    "angle": 90,
                    "attract": {
                      "enable": false,
                      "rotate": {
                        "x": 600,
                        "y": 1200
                      }
                    },
                    "direction": "top",
                    "enable": true,
                    "noise": {
                      "delay": {
                        "random": {
                          "enable": true,
                          "minimumValue": 10
                        },
                        "value": 1
                      },
                      "enable": true
                    },
                    "outMode": "out",
                    "random": false,
                    "speed": 1,
                    "straight": false,
                    "trail": {
                      "enable": false,
                      "length": 10,
                      "fillColor": {
                        "value": "#000000"
                      }
                    },
                    "vibrate": false,
                    "warp": false
                  },
                  "number": {
                    "density": {
                      "enable": true,
                      "area": 800,
                      "factor": ((((10 / this.props.temperature) * 10) ** 7) * 1000),
                    },
                    "limit": 0,
                    "value": 100
                  },
                  "opacity": {
                    "animation": {
                      "enable": true,
                      "minimumValue": 0.1,
                      "speed": 0.1,
                      "sync": false
                    },
                    "random": {
                      "enable": true,
                      "minimumValue": 1
                    },
                    "value": 0.5
                  },
                  "shadow": {
                    "blur": 0,
                    "color": {
                      "value": "#000000"
                    },
                    "enable": false,
                    "offset": {
                      "x": 0,
                      "y": 0
                    }
                  },
                  "size": {
                    "animation": {
                      "destroy": "none",
                      "enable": true,
                      "minimumValue": 0.1,
                      "speed": 3,
                      "startValue": "max",
                      "sync": false
                    },
                    "random": {
                      "enable": true,
                      "minimumValue": 1
                    },
                    "value": 5
                  },
                  "stroke": {
                    "width": 0,
                    "color": {
                      "value": "#000000",
                      "animation": {
                        "enable": false,
                        "speed": 1,
                        "sync": true
                      }
                    }
                  },
                },
                "pauseOnBlur": true
              }}
            />
          }
        </Fader>
      </>
    );
  }
}


export default ParticleContainer;