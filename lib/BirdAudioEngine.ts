export interface AudioNodeData {
    id: number;
    blockCount: number;
    isMuqattat?: boolean;
}

export class BirdAudioEngine {
    private ctx: AudioContext | null = null;
    private isPlaying: boolean = false;
    private timeoutIds: number[] = [];
    private onPlayNode: ((nodeIndex: number) => void) | null = null;

    constructor() {}

    public init(onPlayNode?: (nodeIndex: number) => void) {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        if (onPlayNode) {
            this.onPlayNode = onPlayNode;
        }
    }

    public toggle(nodes: AudioNodeData[], onPlayNode?: (nodeIndex: number) => void) {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
            this.init(onPlayNode);
            this.scheduleLoop(nodes);
        } else {
            this.stopLoop();
        }
        return this.isPlaying;
    }

    public stop() {
        this.isPlaying = false;
        this.stopLoop();
    }

    public updateNodes(nodes: AudioNodeData[]) {
        if (this.isPlaying) {
            // Stop current loop and restart with new nodes to apply immediately
            this.stopLoop();
            this.scheduleLoop(nodes);
        }
    }

    private clearTimeouts() {
        this.timeoutIds.forEach(clearTimeout);
        this.timeoutIds = [];
    }

    private stopLoop() {
        this.clearTimeouts();
        // Maybe we want to stop current oscillators but letting them fade out is fine
    }

    private scheduleLoop(nodes: AudioNodeData[]) {
        if (!this.isPlaying || !this.ctx) return;

        // Canary 5-10s working memory trace: Loop Stabilization (7)
        // We will execute a single 7-second sequence containing the 2 motifs.
        
        // HVC sequential neuron firing: Phrase encoding (3)
        // We break the 6 nodes into 2 phrases of 3 syllables.
        const phrase1 = nodes.slice(0, 3);
        const phrase2 = nodes.slice(3, 6);

        const startTime = this.ctx.currentTime + 0.1;

        // Play phrase 1
        this.playPhrase(startTime, phrase1, 1, 0);

        // Play phrase 2 after a gap
        this.playPhrase(startTime + 2.5, phrase2, -1, 3); // inverted phase or direction, offset index 3

        // Re-schedule the sequence every 7 seconds
        const tid = window.setTimeout(() => {
            this.scheduleLoop(nodes);
        }, 7000);
        this.timeoutIds.push(tid);
    }

    private playPhrase(time: number, phrase: AudioNodeData[], phaseInversion: number, globalOffset: number) {
        if (!this.ctx) return;
        
        // Phrase contains 3 syllables (nodes)
        let cursor = time;
        phrase.forEach((node, idx) => {
            // Syringeal labia oscillation (2 sources): We use 2 oscillators generating an AM trill
            this.playSyllable(cursor, node, idx, phaseInversion);
            
            // Schedule the visual callback
            if (this.onPlayNode) {
                const delayMs = Math.max(0, (cursor - this.ctx.currentTime) * 1000);
                const globalIdx = globalOffset + idx;
                const tid = window.setTimeout(() => this.onPlayNode!(globalIdx), delayMs);
                this.timeoutIds.push(tid);
            }
            
            // Gap between syllables depends on the node's blockCount (verses)
            // Normalizing blockCount (which can be 3 to 286) to a timing gap
            const timingGap = 0.3 + (node.blockCount / 286) * 0.4;
            cursor += timingGap;
        });
    }

    private playSyllable(time: number, node: AudioNodeData, idx: number, phaseInversion: number) {
        if (!this.ctx) return;
        
        // Node id is Chapter (1-114). Base pitch.
        const baseFreq = 1500 + (node.id / 114) * 4500;
        
        // Osc 1: The primary voice
        const osc1 = this.ctx.createOscillator();
        const env1 = this.ctx.createGain();
        
        // Osc 2: The secondary syringeal source (slightly detuned, creating beat frequencies/trills)
        // Pressure wave ON/OFF simulated by AM or beating
        const osc2 = this.ctx.createOscillator();
        const env2 = this.ctx.createGain();

        // The phase inversion (Qun vs FayaQun) directs whether the pitch glides UP or DOWN
        osc1.type = 'sine';
        osc2.type = 'sine';

        // Detune osc2 based on blockCount to create unique texture per chapter
        // High blockCount = faster beating/trill
        const detuneAmount = 5 + (node.blockCount / 286) * 45; 
        
        osc1.frequency.setValueAtTime(baseFreq, time);
        osc2.frequency.setValueAtTime(baseFreq + detuneAmount, time);

        // Qun / FayaQun Alternate wave coupling
        // Phase inversion dictates glide
        const glideTarget = baseFreq * (1 + 0.3 * phaseInversion * (idx % 2 === 0 ? 1 : -1));
        
        osc1.frequency.exponentialRampToValueAtTime(glideTarget, time + 0.15);
        osc2.frequency.exponentialRampToValueAtTime(glideTarget + detuneAmount, time + 0.15);

        // Envelopes
        osc1.connect(env1);
        osc2.connect(env2);
        
        env1.connect(this.ctx.destination);
        env2.connect(this.ctx.destination);

        const volume = 0.15; // master volume per osc
        env1.gain.setValueAtTime(0, time);
        env1.gain.linearRampToValueAtTime(volume, time + 0.02);
        env1.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

        env2.gain.setValueAtTime(0, time);
        env2.gain.linearRampToValueAtTime(volume, time + 0.02);
        env2.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + 0.25);
        osc2.stop(time + 0.25);
    }
}
