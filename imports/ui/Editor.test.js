import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if(Meteor.isClient){

    let call, browserHistory;

    beforeEach(function() {
        call = expect.createSpy();
        browserHistory = {
            push: expect.createSpy()
        };
    });

    describe('Editor', function() {
        it('should render pick note message', function() {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);
            expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.');
        });

        it('should render select note message', function(){
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id}/>);
            expect(wrapper.find('p').text()).toBe('Note not found.');
        });

        it('should remove note', function() {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} note={notes[0]}/>);

            //simulate button click
            wrapper.find('button').simulate('click');
            expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
            expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
        });

        it('should update the note body on text area change', function() {
            const newBody = 'This is the new body text';
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} note={notes[0]}/>);

            wrapper.find('textarea').simulate('change', {
                target: {
                    value: newBody
                }
            });

            expect(wrapper.state('body')).toBe(newBody);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody});
        });

        it('should update the note title on text area change', function() {
            const newTitle = 'This is the new title text';
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} note={notes[0]}/>);

            wrapper.find('input').simulate('change', {
                target: {
                    value: newTitle
                }
            });

            expect(wrapper.state('title')).toBe(newTitle);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle});
        });

        it('should set state for new note', function() {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);

            wrapper.setProps({
                selectedNoteId: notes[0]._id,
                note: notes[0]
            });

            expect(wrapper.state('title')).toBe(notes[0].title);
            expect(wrapper.state('body')).toBe(notes[0].body);
        });

        it('should note set state if note prop not provided', function() {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);

            wrapper.setProps({
                selectedNoteId: notes[0]._id
            });

            expect(wrapper.state('title')).toBe('');
            expect(wrapper.state('body')).toBe('');
        });


    });


}
