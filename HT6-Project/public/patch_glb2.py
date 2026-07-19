import json
import struct

filepath = r"c:\Users\conta\OneDrive\Documents\Personal\Projects\Coding\HT6Project\HT6-Project\public\bunny.glb"
with open(filepath, "rb") as f:
    data = f.read()

json_chunk_len = struct.unpack("<I", data[12:16])[0]
json_data = data[20:20+json_chunk_len]

bin_chunk_offset = 20 + json_chunk_len
bin_chunk_len = struct.unpack("<I", data[bin_chunk_offset:bin_chunk_offset+4])[0]
bin_chunk_type = data[bin_chunk_offset+4:bin_chunk_offset+8]
bin_data = data[bin_chunk_offset+8:bin_chunk_offset+8+bin_chunk_len]

gltf = json.loads(json_data.decode("utf-8"))

for node in gltf.get("nodes", []):
    if node.get("name") == "BrownBunny":
        node["skin"] = 0
        print("Patched BrownBunny with skin=0")

new_json_data = json.dumps(gltf, separators=(',', ':')).encode("utf-8")

# Pad JSON data to multiple of 4 bytes
padding_needed = (4 - (len(new_json_data) % 4)) % 4
new_json_data += b' ' * padding_needed

new_json_chunk_len = len(new_json_data)
new_total_length = 12 + 8 + new_json_chunk_len + 8 + bin_chunk_len

with open(filepath, "wb") as f:
    f.write(data[0:4]) # magic
    f.write(data[4:8]) # version
    f.write(struct.pack("<I", new_total_length))
    f.write(struct.pack("<I", new_json_chunk_len))
    f.write(data[16:20]) # JSON type
    f.write(new_json_data)
    f.write(struct.pack("<I", bin_chunk_len))
    f.write(bin_chunk_type)
    f.write(bin_data)

print("Successfully repackaged GLB.")
