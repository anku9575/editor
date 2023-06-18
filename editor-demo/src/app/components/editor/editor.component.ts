import { Component } from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';

interface Frame {
  top: number;
  left: number;
  width: number;
  height: number;
  zIndex: number;
}

interface TextFrame extends Frame {
  content: string;
}

interface ImageFrame extends Frame {
  src: string;
}

interface Layer {
  textFrames: TextFrame[];
  imageFrames: ImageFrame[];
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  layers: Layer[] = [
    {
      textFrames: [
        {
          top: 50,
          left: 50,
          width: 200,
          height: 100,
          content: 'Sample Text 1',
          zIndex: 1
        },
        {
          top: 200,
          left: 150,
          width: 250,
          height: 150,
          content: 'Sample Text 2',
          zIndex: 2
        },
        {
          top: 300,
          left: 300,
          width: 180,
          height: 120,
          content: 'Sample Text 3',
          zIndex: 3
        },
        {
          top: 400,
          left: 400,
          width: 220,
          height: 100,
          content: 'Sample Text 4',
          zIndex: 4
        }
      ],
      imageFrames: [
        {
          top: 100,
          left: 400,
          width: 200,
          height: 200,
          src: 'https://via.placeholder.com/200x200.png?text=Image+1',
          zIndex: 5
        },
        {
          top: 300,
          left: 100,
          width: 300,
          height: 150,
          src: 'https://via.placeholder.com/300x150.png?text=Image+2',
          zIndex: 6
        },
        {
          top: 500,
          left: 200,
          width: 250,
          height: 180,
          src: 'https://via.placeholder.com/250x180.png?text=Image+3',
          zIndex: 7
        },
        {
          top: 600,
          left: 500,
          width: 180,
          height: 220,
          src: 'https://via.placeholder.com/180x220.png?text=Image+4',
          zIndex: 8
        }
      ]
    }
  ];

  startResizing(event: MouseEvent, frame: Frame) {
    event.stopPropagation();

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = frame.width;
    const startHeight = frame.height;

    const mouseMoveHandler = (e: MouseEvent) => {
      const offsetX = e.clientX - startX;
      const offsetY = e.clientY - startY;
      frame.width = startWidth + offsetX;
      frame.height = startHeight + offsetY;
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  bringLayerToFront(layer: Layer, frame: Frame, layerIndex: number, textImageFrameIndex: number, flag: string) {
    
    const maxZIndex = Math.max(
      ...layer.textFrames.map(textFrame => textFrame.zIndex),
      ...layer.imageFrames.map(imageFrame => imageFrame.zIndex)
    );

    if(flag === 'TEXT') {
      this.layers[layerIndex].textFrames[textImageFrameIndex].zIndex = maxZIndex + 1;
    }
    if(flag === 'IMAGE') {
      this.layers[layerIndex].imageFrames[textImageFrameIndex].zIndex = maxZIndex + 1;
    }
    // if (frame.zIndex !== maxZIndex) {
    //   frame.zIndex = maxZIndex;
    //   this.sortFramesByZIndex(layer);
    // }
  }

  private sortFramesByZIndex(layer: Layer) {
    layer.textFrames.sort((a, b) => a.zIndex - b.zIndex);
    layer.imageFrames.sort((a, b) => a.zIndex - b.zIndex);
  }
}
