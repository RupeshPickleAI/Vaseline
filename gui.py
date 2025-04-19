import tkinter as tk
from tkinter import messagebox
import json
from pathlib import Path

# Function to load the JSON configuration
def load_config():
    config_path = Path('config.json')
    
    # Check if file exists
    if not config_path.exists():
        print("Config file not found! Creating a new one.")
        save_config({})  # Create an empty JSON file if missing
        return {}

    # Check if file is empty
    if config_path.stat().st_size == 0:
        print("Config file is empty! Resetting...")
        save_config({})  # Reset it with empty JSON
        return {}

    # Try loading JSON with error handling
    try:
        with open(config_path, 'r') as file:
            return json.load(file)
    except json.JSONDecodeError:
        print("Config file is corrupted! Resetting...")
        save_config({})  # Reset corrupted file
        return {}

# Function to save the JSON configuration
def save_config(config):
    with open('config.json', 'w') as file:
        json.dump(config, file, indent=4)

# Function to update the configuration based on the button pressed
def update_config(sku):
    config = load_config()
    
    # Define specific changes for each SKU
    sku_configs = {
        1: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[90, 50,50], "upper_bound":[130,255,255], "class_sku":4,"pixel_ratio" :0.4, "output_dir":"comfort_blue_cross_pack"}, #comfort _blue_860_ml_morning fresh
        2: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[0,50,50], "upper_bound":[10,255,255], "lower_bound_1": [160,50,50],"upper_bound_1":[180,255,255],"class_sku":4,"pixel_ratio" :0.4, "output_dir":"comfort_pink_cross_pack"}, #comfort pink 860 ml lily fresh
        3: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[35, 50, 50], "upper_bound":[85, 255, 255], "class_sku":4,"pixel_ratio" :0.4, "output_dir":"comfort_green_cross_pack"}, #comfort green 860 ml garden fresh 
        4: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[0,50, 50], "upper_bound":[10,255,255], "lower_bound_1": [160,50,50],"upper_bound_1":[180,255,255],"class_sku":0,"pixel_ratio" :0.4, "output_dir":"rin_front_load_cross_pack"}, #rin matic front load 
        5: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[90, 50, 50], "upper_bound":[130, 255, 255], "class_sku":0,"pixel_ratio" :0.4, "output_dir":"rin_matic_top_load_cross_pack"}, #rin matic top load 
        6: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '>=',"lower_bound":[110, 50, 50], "upper_bound":[150, 200, 255], "class_sku":1,"pixel_ratio" :0.1, "output_dir":"surf_excel_front_500_ml_cross_pack"}, #surf excel matic front load 500 ml
        7: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '>=',"lower_bound":[80, 50, 30], "upper_bound":[120, 255, 255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_Top_500_ml_cross_pack"}, # surf execel matic top load 500 ml
        8: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[0,0,180], "upper_bound":[180, 65, 255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_easy_wash_1ltr_cross_pack"}, #surf excel easy wash 1 ltr
        9: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '>=',"lower_bound":[0,0,180], "upper_bound":[180, 65, 255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_easy_wash_500_ml_cross_pack"}, #surf excel eash wash 500 ml 
        10: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[5, 100, 30], "upper_bound":[25, 255, 255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_quick_wash_1_ltr"}, #surf excel quick wash 1 ltr
        11: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '>=',"lower_bound":[5, 100, 30], "upper_bound":[25, 255, 255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_quick_wash_500_ml"}, #surf excel quick wash 500 ml
        12: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[90, 50, 50], "upper_bound":[130, 255, 255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_matic_top_load_1ltr"}, #surf_excel_matic_top_load_1_ltr
        13: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[0,50,50], "upper_bound":[10, 255, 255],"lower_bound_1": [160, 50, 50],"upper_bound_1":[180,255,255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_matic_front_load_1_ltr"}, #surf_excel_matic_front_load_1_ltr
    }

    if sku in sku_configs:
        config.update(sku_configs[sku])  # Update config file with SKU-specific values
    else:
        messagebox.showwarning("Invalid SKU", f"No configuration defined for SKU {sku}")
        return

    # Save the updated configuration
    save_config(config)
    messagebox.showinfo("Configuration Updated", f"Configuration updated for SKU {sku}")

# Create the main window
root = tk.Tk()
root.title("SKU Configuration")
root.geometry("400x600")

# Create 5 buttons for SKUs 1 to 5 (you can extend up to 13)
for i in range(1, 12):
    button = tk.Button(root, text=f"SKU {i}", command=lambda sku=i: update_config(sku), width=15, height=2)
    button.pack(pady=5)

# Run the application
root.mainloop()
