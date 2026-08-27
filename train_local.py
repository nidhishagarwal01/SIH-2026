import os
import sys
import shutil
import argparse
from pathlib import Path
from ultralytics import YOLO

def train_yolo(dataset_dir: str, epochs: int = 100, batch_size: int = 16, img_size: int = 640):
    dataset_path = Path(dataset_dir).resolve()
    data_yaml = dataset_path / "data.yaml"

    if not data_yaml.exists():
        print(f"❌ Error: data.yaml not found at {data_yaml}")
        sys.exit(1)

    print(f"🚀 Starting YOLOv8 Heritage Crack Detection Training...")
    print(f"📍 Dataset Path: {dataset_path}")
    print(f"📄 Config File:  {data_yaml}")
    print(f"🔄 Epochs:       {epochs}")
    print(f"🖼️ Image Size:   {img_size}")

    # Load pre-trained nano YOLOv8 model
    model = YOLO("yolov8n.pt")

    # Run model training
    results = model.train(
        data=str(data_yaml),
        epochs=epochs,
        imgsz=img_size,
        batch=batch_size,
        name="heritage_crack_yolov8",
        project="runs/detect",
        exist_ok=True
    )

    # Save best model to backend models directory
    best_weights_path = Path(results.save_dir) / "weights" / "best.pt"
    target_models_dir = Path("./heritage-shield-backend/data/models").resolve()
    target_models_dir.mkdir(parents=True, exist_ok=True)
    target_weights_path = target_models_dir / "yolov8_heritage_crack.pt"

    if best_weights_path.exists():
        shutil.copy(best_weights_path, target_weights_path)
        print(f"✅ Training Complete! Best weights saved to: {target_weights_path}")
    else:
        print(f"⚠️ Warning: best.pt not found at {best_weights_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train YOLOv8 on Heritage Crack Dataset")
    parser.add_argument("dataset_dir", nargs="?", default="./heritage-shield-backend/data/heritage_crack_dataset", help="Path to dataset directory containing data.yaml")
    parser.add_argument("epochs", nargs="?", type=int, default=100, help="Number of training epochs")
    parser.add_argument("--batch", type=int, default=16, help="Batch size")
    parser.add_argument("--imgsz", type=int, default=640, help="Image resolution")

    args = parser.parse_args()
    train_yolo(args.dataset_dir, args.epochs, args.batch, args.imgsz)
