import bpy
import os

filepath = r"c:\Users\conta\Downloads\Cute Bunny\cute_bunny_rigged.blend"
bpy.ops.wm.open_mainfile(filepath=filepath)

obj = bpy.data.objects.get("BrownBunny")
arm = bpy.data.objects.get("BunnyArmature")

if obj and arm:
    has_armature = False
    for mod in obj.modifiers:
        if mod.type == "ARMATURE":
            has_armature = True
            mod.object = arm
            break
            
    if not has_armature:
        mod = obj.modifiers.new(name="Armature", type="ARMATURE")
        mod.object = arm
        print("Added Armature modifier")
        
    if obj.parent != arm:
        obj.parent = arm
        print("Parented to Armature")
        
    # Deselect all and select just BrownBunny and BunnyArmature
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    arm.select_set(True)
    
    # Export to GLB
    export_path = r"c:\Users\conta\OneDrive\Documents\Personal\Projects\Coding\HT6Project\HT6-Project\public\bunny.glb"
    
    bpy.ops.export_scene.gltf(
        filepath=export_path,
        use_selection=True,
        export_format='GLB',
        export_skins=True,
        export_morph=True,
        export_yup=True
    )
    
    bpy.ops.wm.save_as_mainfile(filepath=filepath)
    print("SUCCESS")
else:
    print("ERROR: Could not find BrownBunny or BunnyArmature")
